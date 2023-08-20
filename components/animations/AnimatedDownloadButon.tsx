import React from 'react'
import Image from 'next/image'

import Lottie from 'react-lottie-player'
import lottieJson from '../../assets/animated-photo.json'
import { DownloadQuoteCardCon, CenteredLottie, DownloadQuoteCardContext } from './AnimationElements'

interface AnimatedDownloadButtonProps {
    handleDownload: () => void;
}

export const AnimatedDownloadButton = ({handleDownload}: AnimatedDownloadButtonProps) => {
    return (
        <DownloadQuoteCardCon onClick={handleDownload}>
            <CenteredLottie
                loop
                animationData={lottieJson}
                play
            />

            <DownloadQuoteCardContext>
                Download your quote card
            </DownloadQuoteCardContext>
        </DownloadQuoteCardCon>
    )
}