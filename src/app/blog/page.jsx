import moment from "moment";
import BlogCard from "../components/BlogCard";

export default function Blog() {
    const dummyEvents = [
        {
          id: "1",
          title: "Dhaka Marathon 2025",
          slug: "dhaka-marathon-2025",
          featureImage: "https://images.unsplash.com/600x400/?marathon,run",
          organizer: { title: "Bangladesh Athletics Federation" },
          location: { city: "Dhaka" },
          startDateTime: "2025-02-15T06:00:00Z",
          endDateTime: "2025-02-15T12:00:00Z",
          price: "800TK",
        },
        {
          id: "2",
          title: "Chattogram Half Marathon",
          slug: "chattogram-half-marathon",
          featureImage: "https://images.unsplash.com/600x400/?runners,marathon",
          organizer: { title: "Chattogram Runners Club" },
          location: { city: "Chattogram" },
          startDateTime: "2025-03-10T05:30:00Z",
          endDateTime: "2025-03-10T10:30:00Z",
          price: "600TK",
        },
        {
          id: "3",
          title: "Cox’s Bazar Beach Marathon",
          slug: "coxs-bazar-beach-marathon",
          featureImage: "https://images.unsplash.com/600x400/?beach,marathon",
          organizer: { title: "Cox’s Bazar Tourism Club" },
          location: { city: "Cox’s Bazar" },
          startDateTime: "2025-04-05T06:00:00Z",
          endDateTime: "2025-04-05T11:00:00Z",
          price: "1000TK",
        },
        {
          id: "4",
          title: "Sylhet International Marathon",
          slug: "sylhet-international-marathon",
          featureImage: "https://images.unsplash.com/600x400/?city,marathon",
          organizer: { title: "Sylhet Runners Association" },
          location: { city: "Sylhet" },
          startDateTime: "2025-05-20T06:00:00Z",
          endDateTime: "2025-05-20T12:00:00Z",
          price: "750TK",
        },
        {
          id: "5",
          title: "Bangladesh Charity Run 2025",
          slug: "bangladesh-charity-run-2025",
          featureImage: "https://images.unsplash.com/600x400/?charity,marathon",
          organizer: { title: "Bangladesh Charity Foundation" },
          location: { city: "Khulna" },
          startDateTime: "2025-06-15T06:30:00Z",
          endDateTime: "2025-06-15T11:30:00Z",
          price: "500TK",
        },
      ];
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 pt-[120px] ">
            <div className="max-w-[1300px] mx-auto">
              <h2 className="text-4xl text-[#C02130] md:text-5xl lg:text-[64px] font-bold md:font-black text-center mb-12">
                Blog
              </h2>
    
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyEvents.map((event) => (
                  <BlogCard
                    key={event.id}
                    title={event.title}
                    featureImage={event.featureImage}
                    organizer={event.organizer.title}
                    location={event.location.city}
                    startDate={moment(event.startDateTime).format("MMM Do")}
                    endDateTime={moment(event.endDateTime).format(
                      "MMMM Do, YYYY h:mm A"
                    )}
                    price="500TK"
                  />
                ))}
              </div>
            </div>
          </section>
  )
}
