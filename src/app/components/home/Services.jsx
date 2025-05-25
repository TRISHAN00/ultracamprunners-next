import Image from "next/image";



export default function Services({ data }) {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold md:font-black">
            Our <span className="text-[#C02130]">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.posts?.list?.map((service, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Image
                  src={service?.images?.[0]?.full_path}
                  alt={service.alt}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-red-700">
                    {service?.data?.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
