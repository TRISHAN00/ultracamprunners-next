import Image from "next/image";

export default function Features({ data }) {
  const subtitle = data?.section_data?.subtitle;
  const short_desc = data?.section_data?.short_desc;
  const features = data?.posts?.list || [];
  const cardImage = data;
  
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#FAFBFC]">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center space-y-4 mb-12">
          {subtitle && (
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold md:font-black">
              <span dangerouslySetInnerHTML={{ __html: subtitle }} />
            </h2>
          )}

          {short_desc && (
            <p className="text-muted-foreground text-md max-w-3xl mx-auto">
              {short_desc}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, index) => {
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg"
              >
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${cardImage?.images?.list?.[0]?.full_path}')`,
                    backgroundPosition: "center 25%",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-[#C02130]/90 transition-all duration-500 group-hover:from-[#C02130]/90 group-hover:to-black/90" />

                {/* Content */}
                <div className="relative p-6 h-full flex flex-col space-y-4 min-h-[250px]">
                  <Image
                    width={50}
                    height={50}
                    src={
                      feature?.images?.[0]?.full_path || "/fallback-image.jpg"
                    }
                    alt="Feature Image"
                  />
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-white">
                      {feature?.data?.title}
                    </h3>
                    <p className="text-gray-200">{feature?.data?.short_desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function RunnerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"></path>
    </svg>
  );
}
