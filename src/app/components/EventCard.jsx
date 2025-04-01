"use client";

import Image from "next/image";
import Link from "next/link";

export default function EventCard({
  title,
  featureImage,
  organizer,
  location,
  date,
  price,
  slug,
}) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={featureImage}
        alt={title}
        width={400}
        height={250}
        className="w-full h-60 object-cover"
        unoptimized={featureImage.includes("localhost")} // Use unoptimized images for local development
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">Organized by: {organizer}</p>
        <p className="text-gray-600 text-sm">Location: {location}</p>
        <p className="text-gray-600 text-sm">
          Date: {date}
        </p>
        <p className="text-gray-800 font-bold mt-2">Price: {price} Tk</p>
        <Link
          href={`/ucr-events/${slug}`}
          className="inline-block mt-4 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
