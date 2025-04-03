import parse from 'html-react-parser';
import Image from 'next/image';
import Button from '../Button';


export default function JoinInfo({data}) {
  console.log(data)
  return (
    <section className="bg-[#AD242F] relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 py-16 md:py-24 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <p className="text-lg font-medium opacity-90">{data?.section_data?.subtitle}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{data?.section_data?.title}</h1>
            <p className="text-lg opacity-90 max-w-xl">
              {parse(data?.section_data?.description)}
            
            </p>
            <Button title={'Join Now'} path={data?.section_data?.search_slug} />
          </div>

          {/* Image */}
          <div className="relative h-[300px] md:h-[500px]">
            <Image
              src={data?.images?.list?.[0]?.full_path}
              alt="Runner giving thumbs up"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
