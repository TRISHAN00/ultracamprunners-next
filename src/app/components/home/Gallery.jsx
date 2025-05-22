'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'


export default function GallerySection({data}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const images = data?.images?.list;

  return (
    <div className="max-w-[1300px] mx-auto text-center space-y-4 mb-8">
      <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold md:font-black">
        Our <span className="text-[#C02130]">Gallery</span>
      </h1>

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 1024: 5 }}>
        <Masonry gutter="16px">
          {images?.map((src, index) => (
            <Image
              key={index}
              src={src?.full_path}
              alt={`Gallery Image ${index + 1}`}
              width={500}
              height={300}
              className="shadow-md"
              style={{ width: '100%', height: 'auto' }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}
