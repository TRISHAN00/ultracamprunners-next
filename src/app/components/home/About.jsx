import parse from "html-react-parser";
import Image from "next/image";
import { FaRunning } from "react-icons/fa";

export default function About({ data }) {
  return (
    <section className="py-32 px-4 md:px-6 lg:px-8 pt-[120px]">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6 my-auto">
            <div className="flex items-center gap-2 text-lg">
              <FaRunning color={"#AD242F"} />
              <span className="font-medium tracking-[3px]">About Us</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#AD242F]">
              {parse(data?.section_data?.short_desc)}
            </h2>

            <p className="text-muted-foreground">
              {parse(data?.section_data?.description)}
            </p>
          </div>

          {/* Center Column - Image */}

          {data?.images?.list?.[0]?.full_path && (
            <div className="relative h-[400px] md:h-full">
              <Image
                src={data?.images?.list?.[0]?.full_path}
                alt="Ultra Camp Runners Team Member"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {/* Right Column */}
          <div className="space-y-8">
            {data?.posts?.list?.map((item, index) => {
              return (
                <div key={index} className="space-y-4 p-4 rounded-md shadow-md">
                  <h3 className="text-2xl font-bold">{item?.data?.title}</h3>
                  <p className="text-muted-foreground text-md">
                    {parse(item?.data?.description)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
