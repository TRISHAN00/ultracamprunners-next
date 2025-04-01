'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function InnerBanner() {
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   // Add form submission logic here
  // }

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Call Us',
      content: '01886020826',
      href: 'tel:01886020826',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Mail Us',
      content: 'bd.ultracamprunners@gmail.com',
      href: 'mailto:bd.ultracamprunners@gmail.com',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Visit Us',
      content: 'K-166,South Badda,Gulshan,Dhaka-1212',
      href: 'https://maps.google.com/?q=K-166,South+Badda,Gulshan,Dhaka-1212',
    },
  ]

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-28-at-1.24.09-AM-1.jpeg"
          alt="Ultra Camp Runners team"
          fill
          className="object-top object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#C02130]/50 to-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">Contact Us</h1>
        </div>
      </div>

      {/* Contact Content */}
      <div className="w-full bg-white my-6 md:my-8 lg:my-10 py-6 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {contactInfo.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group flex flex-col md:flex-row items-center gap-3 transition-colors hover:text-[#AD242F]"
              >
                <div className="p-2 rounded-full bg-[#AD242F] text-white group-hover:bg-[#AD242F]/90">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#AD242F]">{item.title}</h3>
                  <p className="text-muted-foreground group-hover:text-[#AD242F]">{item.content}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
