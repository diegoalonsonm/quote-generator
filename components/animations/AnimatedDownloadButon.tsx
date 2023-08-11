import React from 'react'
import Image from 'next/image'

import Lottie from 'react-lottie-player'
import lottieJson from '../../assets/animated-photo.json'
import { DownloadQuoteCardCon, CenteredLottie, DownloadQuoteCardContext } from './AnimationElements'


export const AnimatedDownloadButton = () => {
    return (
        <DownloadQuoteCardCon onclick={null}>
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