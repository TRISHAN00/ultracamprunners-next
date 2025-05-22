import parse from 'html-react-parser';
import Button from "../Button";

export default function ExploreEvents({ data }) {
  const events = data?.posts?.list;
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#F4F5F6]">
      <div className="max-w-[1300px] mx-auto text-center space-y-4 mb-8">
        <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold md:font-black">
          {parse(data?.section_data?.subtitle || "") }
        </h2>
        <p className="text-muted-foreground text-md max-w-3xl mx-auto">
          {data?.section_data?.short_desc}
        </p>
        <div className="flex justify-center">
          <Button
            bgColor={"#AD242F"}
            path={"/ucr-events"}
            title={"Explore Our Events"}
          />
        </div>
      </div>

      <div
        className="max-w-[1300px] mx-auto bg-cover bg-center relative z-10 p-10 rounded-md overflow-hidden"
        style={{
          backgroundImage: `url('${data?.images?.list?.[0]?.full_path}')`,
        }}
      >
        <div className="max-w-2xl mx-auto grid md:grid-cols-2 z-20">
          {
            events?.map((item, index) => {
              return (
                <div key={index} className="py-2 flex items-center gap-3 text-white">
                <RunnerIcon className="h-5 w-5" />
                <span className="font-black text-lg md:text-2xl">{item?.data?.title}</span>
              </div>
              )
            })
          }
         
        </div>

        <div className="absolute inset-0 bg-black/60 -z-10"></div>
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
