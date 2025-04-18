'use client'

import parse from 'html-react-parser';
import Link from 'next/link';


export default function Info({info}) {

  return (
    <section className="relative">
      {/* Hero Section */}
     

      {/* Contact Content */}
      <div className="w-full bg-white my-6 md:my-8 lg:my-10 py-6 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            
            {
              info?.posts?.list?.map(item => {
                return (
                  <Link
                key={1}
                href={'#'}
                className="group flex flex-col md:flex-row items-center gap-3 transition-colors hover:text-[#AD242F]"
              >
                <div className="p-2 rounded-full bg-[#AD242F] text-white group-hover:bg-[#AD242F]/90">
                  icon
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#AD242F]">{item?.data?.title}</h3>
                  <p className="text-muted-foreground group-hover:text-[#AD242F]">{parse(item?.data?.description)}</p>
                </div>
              </Link>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}
