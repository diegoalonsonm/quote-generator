import React, { useState } from 'react'

import Head from 'next/head'

import Clouds1 from '../assets/cloud-and-thunder.png'
import Clouds2 from '../assets/cloudy-weather.png'

import { BackgroundImage1, BackgroundImage2, FootCont, FooterLink, GradientBackgroundCon } from '@/components/QuoteGenerator/QuoteGeneratorElements'

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0)

  return (
    <>
      <Head>
        <title>Quote Generator</title>
        <meta name="description" content="Project to generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <GradientBackgroundCon>
        <BackgroundImage1 src={Clouds1} height="300" alt="cloudybackground1"/>
        <BackgroundImage2 src={Clouds2} height="300" alt="cloudybackground1"/>

        <FootCont>
          <>
            Quotes generated: {numberOfQuotes}
            <br/>
            Developed by <FooterLink href="google.com" target="_blank"
            rel="noopener noreferrer">Diego Naranjo</FooterLink>
          </>
        </FootCont>
      </GradientBackgroundCon>
    </>
  )
}
