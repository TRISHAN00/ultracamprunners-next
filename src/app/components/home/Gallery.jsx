'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

export default function GallerySection({ data }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const images = data?.images?.list

  return (
    <section className="max-w-[1300px] mx-auto ">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight">
          Our <span className="text-[#C02130]">Gallery</span>
        </h1>
      </div>

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
        <Masonry gutter="20px">
          {images?.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={src?.full_path}
                alt={`Gallery Image ${index + 1}`}
                width={500}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  )
}
