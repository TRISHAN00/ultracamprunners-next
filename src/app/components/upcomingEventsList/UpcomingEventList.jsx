import UpcomingEventListCard from "./UpcomingEventListCard";

const UpcomingEventList = ({ events, upComingEvent }) => {
  return (
    <section className="pt-[120px] pb-[120px]  bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upComingEvent?.posts?.list?.map((event) => (
            <UpcomingEventListCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventList;
