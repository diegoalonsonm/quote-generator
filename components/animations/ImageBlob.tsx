import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImageBlobProps {
    quoteRecieved: String;
    blobUrl: string | null;
}

export const ImageBlob = ({quoteRecieved, blobUrl}: ImageBlobProps) => {
    return (
        <div>
            image blob
        </div>
    )
}