'use client'

import parse from 'html-react-parser';
import Link from 'next/link';

export default function Info({ info }) {
  return (
    <section className="relative">
      {/* Contact Content */}
      <div className="w-full bg-white my-6 md:my-8 lg:my-10 py-6 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {
              info?.posts?.list?.map((item, index) => {
                const title = item?.data?.title || 'No title';
                const description = item?.data?.description || '';

                return (
                  <Link
                    key={item?.id || index}
                    href={'/'}
                    className="group flex flex-col md:flex-row items-center gap-3 transition-colors hover:text-[#AD242F]"
                  >
                    <a>
                      <div className="p-2 rounded-full bg-[#AD242F] text-white group-hover:bg-[#AD242F]/90">
                      icon
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#AD242F]">{title}</h3>
                      <p className="text-muted-foreground group-hover:text-[#AD242F]">
                        {parse(description)}
                      </p>
                    </div>
                    </a>
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
