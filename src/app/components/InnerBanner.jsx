"use client";

import Image from "next/image";

const InnerBanner = ({ img, text, title }) => {
  return (
    <section className="relative pt-[30.74%] bg-gray-300 InnerBanner">
      {/* Image with fill */}
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Title */}
      <div className="absolute left-0 right-0 bottom-[69px] md:bottom-[94px] z-10 px-4 max-w-[1200px] mx-auto">
        <h2 className="text-white text-[40px] md:text-[60px] font-normal leading-[45px] md:leading-[70px] text-center uppercase anim-active fade-up">
          {title}
        </h2>
      </div>
    </section>
  );
};

export default InnerBanner;
