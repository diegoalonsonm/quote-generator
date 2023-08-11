import React from 'react'

import { Modal, Backdrop, Fade } from '@mui/material'
import { ModalCircularProgress, QuoteGeneratorModalCon, QuoteGeneratorModalInnerCon, QuoteGeneratorSubtitle, QuoteGeneratorTitle } from './QuoteGeneratorElements';
import { ImageBlob } from '@/components/animations/ImageBlob';
import { ImageBlobCon } from '../animations/AnimationElements';
import { AnimatedDownloadButton } from '../animations/AnimatedDownloadButon';

interface QuoteGeneratorModalProps {
    open: boolean;
    close: () => void;
    processingQuote: boolean;
    setProcessingQuote: React.Dispatch<React.SetStateAction<boolean>>;
    quoteRecieved: String | null;
    setQuoteRecieved: React.Dispatch<React.SetStateAction<String | null>>;

}

const style = {

}

export const QuoteGeneratorModal = ({
        open,
        close,
        processingQuote,
        setProcessingQuote,
        quoteRecieved,
        setQuoteRecieved
    }: QuoteGeneratorModalProps) => {

    const wiseDevQuote = '"If you can center a div, you can do anything."'
    const wiseDevQuoteAuthor = "- a wise Senior Dev"
    
    return (
        <Modal
            id="QuoteGeneratorModal"
            aria-labelledby="spring-modal-quote-generator-modal"
            aria-describedby="spring-modal-opens-and-closes-quote-generator"
            open={open}
            onClose={close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <QuoteGeneratorModalCon sx={style}>
                    <QuoteGeneratorModalInnerCon>
                       {
                            (processingQuote === true && quoteRecieved === null) &&
                            <>
                                <ModalCircularProgress 
                                    size={"8rem"}
                                    thickness={2.5}
                                />
                                <QuoteGeneratorTitle>
                                    Creating yout quote...
                                </QuoteGeneratorTitle>
                                <QuoteGeneratorSubtitle style={{marginTop: "20px"}}>
                                    {wiseDevQuote}
                                    <br />
                                    <span style={{fontSize: 26}}>
                                        {wiseDevQuoteAuthor}
                                    </span>
                                </QuoteGeneratorSubtitle>
                            </>
                        }
                        {quoteRecieved !== null &&
                            <>
                                <QuoteGeneratorTitle>
                                    Download your quote!
                                </QuoteGeneratorTitle>
                                <QuoteGeneratorSubtitle style={{marginTop: "20px"}}>
                                    See a preview:
                                </QuoteGeneratorSubtitle>
                                <ImageBlobCon>
                                    <ImageBlob 
                                        quoteRecieved={quoteRecieved}
                                        blobUrl={bloblUrl}
                                    />
                                </ImageBlobCon>
                                <AnimatedDownloadButton />
                            </>
                        }
                    </QuoteGeneratorModalInnerCon>
                </QuoteGeneratorModalCon>
            </Fade>
        </Modal>
    )
}