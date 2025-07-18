"use client";

import parse from "html-react-parser";
import Image from "next/image";

export default function Info({ info }) {
  return (
    <section className="relative">
      {/* Contact Content */}
      <div className="w-full bg-white my-6 md:my-8 lg:my-10 py-6 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {info?.posts?.list?.map((item, index) => {
              const title = item?.data?.title || "No title";
              const description = item?.data?.description || "";
              const icon = item?.images?.[0]?.full_path || "";

              return (
                <div
                  key={item?.id || index}
                  href="tel:01758950857"
                  className="group flex flex-col md:flex-row items-center gap-3 transition-colors "
                >
                  <div className="p-2 rounded-full  text-white">
                    <Image
                      src={icon}
                      alt={title}
                      width={30} // or adjust size as needed
                      height={30}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#AD242F]">
                      {title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-[#AD242F]">
                      {parse(description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
