import {
  CalendarDays,
  Camera,
  ClipboardList,
  Medal,
  Shirt,
  Timer,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Event Registration",
    icon: <ClipboardList className="w-5 h-5" />,
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/register-now-document-filling-form-concept-1024x767.jpg",
    alt: "Laptop showing event registration form",
  },
  {
    title: "Event Planning & Management",
    icon: <CalendarDays className="w-5 h-5" />,
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/martins-zemlickis-NPFu4GfFZ7E-unsplash-1024x680.jpg",
    alt: "Marathon runners on city street",
  },
  {
    title: "Timing Solutions",
    icon: <Timer className="w-5 h-5" />,
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/runner-setting-up-smart-watch-before-training-sunset-exercise_53476-3845.jpg",
    alt: "Smart watch showing running statistics",
  },
  {
    title: "Photography, Videography & Drone",
    icon: <Camera className="w-5 h-5" />,
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/jakob-owens-fkaZiACUb5w-unsplash-1024x709.jpg",
    alt: "Professional camera equipment layout",
  },
  {
    title: "Medal Design & Production",
    icon: <Medal className="w-5 h-5" />,
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/kelly-sikkema-o2TRWThve_I-unsplash-1024x677.jpg",
    alt: "Hands working on medal design",
  },
  {
    title: "T-Shirt Design & Production",
    icon: <Shirt className="w-5 h-5" />,
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-1.28.21-AM-1024x704.jpeg",
    alt: "Sports jersey design mockup",
  },
];

export default function Services({ data }) {
  console.log(data);
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
