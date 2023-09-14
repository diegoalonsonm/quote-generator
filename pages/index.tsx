import React, { useState, useEffect } from 'react'

import Head from 'next/head'

import Clouds1 from '../assets/cloud-and-thunder.png'
import Clouds2 from '../assets/cloudy-weather.png'

import { BackgroundImage1, BackgroundImage2, FootCont, FooterLink, GenerateQuoteButton, 
  GenerateQuoteButtonText, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon,
  QuoteGeneratorSubtitle, QuoteGeneratorTitle } 
  from '@/components/QuoteGenerator/QuoteGeneratorElements'
import { QuoteGeneratorModal } from '@/components/QuoteGenerator'

import { API } from 'aws-amplify'
import { generateAQuote, quotesQueryName } from '@/src/graphql/queries'
import { GraphQLResult } from '@aws-amplify/api-graphql'

//create interface for dynamodb
interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string
}

//interface for appsync to lambda
interface GenerateAQuoteData {
  generateAQuote: {
    statusCode: number,
    headers: {[key: string] : string},
    body: string
  };
}

//type guard for fetching data
function isGraphQLResultForQuotesQueryName(response: any): response is GraphQLResult<{
  quotesQueryName: {
    items: [UpdateQuoteInfoData]
  }
}> {
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items
}


export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0)
  const [openGenerator, setOpenGenerator] = useState<boolean>(false)
  const [processingQuote, setProcessingQuote] = useState<boolean>(false)
  const [quoteRecieved, setQuoteRecieved] = useState<String | null>(null)

  //fetch data from dynamodb
  const updateQuoteInfo = async () => {
    try {
      const response = await API.graphql<UpdateQuoteInfoData>({
        query: quotesQueryName,
        authMode: "AWS_IAM",
        variables: {
          queryName: "LIVE"
        },
      })
      console.log('response from graphql', response)

      // create type guard for response
      if (!isGraphQLResultForQuotesQueryName(response)) {
        throw new Error('No response from API.grapql')
      }

      if(!response.data) {
        throw new Error('Undefined data')
      }

      const recievedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated
      setNumberOfQuotes(recievedNumberOfQuotes)

    } catch (error) {
      console.log('error getting data', error)
    }
  }

  useEffect(() => {
    updateQuoteInfo()
  }, [])
  
  // functions quote generator modal
  const handleCloseGenerator = () => {
    setOpenGenerator(false)
    setProcessingQuote(false)
    setQuoteRecieved(null)
  }

  const handleOpenGenerator = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setOpenGenerator(true)
    setProcessingQuote(true)
    try{
      // run lambda function
      const runFunction = "runFunction"
      const runFunctionStringified = JSON.stringify(runFunction)
      const response = await API.graphql<GenerateAQuoteData>({
        query: generateAQuote,
        authMode: "AWS_IAM",
        variables: {
          input: runFunctionStringified
        },
      })
      const responseStringified = JSON.stringify(response)
      const responseReStringified = JSON.stringify(responseStringified)
      const bodyIndex = responseReStringified.indexOf('body=') + 5
      const bodyAndBase64 = responseReStringified.substring(bodyIndex)
      const boddyArray = bodyAndBase64.split(',')
      const body = boddyArray[0]
      console.log(body)
      setQuoteRecieved(body)

      setProcessingQuote(false)

      //fetcvh new quotes
      updateQuoteInfo()

      //setTimeout(() => {
      //  setProcessingQuote(false)
      //}, 3000)
    } catch (error) {
      console.log('error generating quote', error)
      setProcessingQuote(false)
    }
  }

  return (
    <>
      <Head>
        <title>Quote Generator</title>
        <meta name="description" content="Project to generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <GradientBackgroundCon>
        {/* bg images */}
        <BackgroundImage1 src={Clouds1} height="300" alt="cloudybackground1"/>
        <BackgroundImage2 src={Clouds2} height="300" alt="cloudybackground1"/>

        <QuoteGeneratorModal 
          open={openGenerator}
          close={handleCloseGenerator}
          processingQuote={processingQuote}
          setProcessingQuote={setProcessingQuote}
          quoteRecieved={quoteRecieved}
          setQuoteRecieved={setQuoteRecieved}
        />

        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Quote Generator
            </QuoteGeneratorTitle>
            <QuoteGeneratorSubtitle>
              Click the button to generate a quote
            </QuoteGeneratorSubtitle>
            <GenerateQuoteButton onClick={handleOpenGenerator}>
              <GenerateQuoteButtonText>
                Generate Quote
              </GenerateQuoteButtonText>
            </GenerateQuoteButton>
          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>

        {/* footer */}
        <FootCont>
          <>
            Quotes generated: {numberOfQuotes}
            <br/>
            Developed by <FooterLink href="https://github.com/diegoalonsonm" target="_blank"
            rel="noopener noreferrer">Diego Naranjo</FooterLink>
          </>
        </FootCont>
      </GradientBackgroundCon>
    </>
  )
}
