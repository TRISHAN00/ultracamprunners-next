"use client";

import Image from "next/image";

const InnerBanner = ({ img, text, title }) => {
  return (
    <section className="relative w-full h-[60vw] sm:h-[50vw] md:h-[40vw] lg:h-[40vw] xl:h-[30vw] bg-gray-300 overflow-hidden">
      {/* Responsive background image */}
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* Title */}
      <div className="absolute bottom-12 md:bottom-24 w-full z-10 px-4">
        <h2 className="text-white text-center text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-bold leading-tight md:leading-[70px] uppercase anim-active fade-up max-w-[90%] md:max-w-[70%] mx-auto">
          {title}
        </h2>
      </div>
    </section>
  );
};

export default InnerBanner;
