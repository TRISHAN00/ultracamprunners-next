'use client'

import Image from 'next/image'


export default function ProductCard({ image, category, name, price, isSoldOut = false }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition max-w-[280px]">
      {/* Image Container */}
      <div className="relative">
        {isSoldOut && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-md">
            SOLD OUT
          </span>
        )}
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="rounded-lg w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="mt-4">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-lg font-semibold text-gray-700">{price}৳</p>
        <p className="text-sm text-gray-500 uppercase mt-1">{category}</p>

        {/* Buy Now Button */}
        {/* <button
          className={`mt-3 px-4 py-2 text-white text-sm font-bold rounded-md w-full 
          ${isSoldOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
          disabled={isSoldOut}
        >
          Buy Now
        </button> */}
      </div>
    </div>
  )
}
