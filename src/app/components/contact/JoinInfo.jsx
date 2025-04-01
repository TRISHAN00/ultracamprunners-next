import Image from 'next/image'
import Button from '../Button'

export default function JoinInfo() {
  return (
    <section className="bg-[#AD242F] relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 py-16 md:py-24 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <p className="text-lg font-medium opacity-90">Ultra Camp Runners</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Join Us on the Run</h1>
            <p className="text-lg opacity-90 max-w-xl">
              At Ultra Camp Runners, we&apos;re not just about organizing marathons. We want to
              create a culture of fitness, friendship, and success. We believe in the power of
              running to bring people together and make a positive difference.
            </p>
            <Button title={'Join Now'} path={'https://www.facebook.com/groups/1527342020772453'} />
          </div>

          {/* Image */}
          <div className="relative h-[300px] md:h-[500px]">
            <Image
              src="https://ultracamprunners.com/wp-content/uploads/2024/09/445366130_850467533765179_8129335098963797813_n-1024x683.jpg"
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
