import UpcomingEventList from "../components/upcomingEventsList/UpcomingEventList";

export default function EventsPage() {
    // Sample data - in a real application, this would come from an API or CMS
    const upcomingEvents = [
      {
        id: 1,
        name: "Web Development Workshop",
        organizer: "CodemanBD",
        bannerUrl: "/images/events/web-dev-workshop.jpg",
        date: "May 15, 2025 • 10:00 AM - 4:00 PM",
        location: "Tech Hub, Dhaka",
        facebookUrl: "https://facebook.com/events/123"
      },
      {
        id: 2,
        name: "AI & Machine Learning Conference",
        organizer: "Tech Innovators",
        bannerUrl: "/images/events/ai-conference.jpg",
        date: "June 3, 2025 • 9:00 AM - 5:00 PM",
        location: "Convention Center, Chittagong",
        facebookUrl: "https://facebook.com/events/456"
      },
      {
        id: 3,
        name: "UX/UI Design Masterclass",
        organizer: "Design Community BD",
        bannerUrl: "/images/events/ux-masterclass.jpg",
        date: "May 28, 2025 • 2:00 PM - 6:00 PM",
        location: "Creative Space, Gulshan, Dhaka",
        facebookUrl: "https://facebook.com/events/789"
      },
      {
        id: 4,
        name: "Blockchain Technology Summit",
        organizer: "Future Tech Association",
        bannerUrl: "/images/events/blockchain-summit.jpg",
        date: "June 12, 2025 • 10:00 AM - 6:00 PM",
        location: "Digital Center, Banani, Dhaka",
        facebookUrl: "https://facebook.com/events/101"
      },
      {
        id: 5,
        name: "Mobile App Development Bootcamp",
        organizer: "CodemanBD",
        bannerUrl: "/images/events/mobile-dev-bootcamp.jpg",
        date: "July 8-10, 2025 • 9:00 AM - 5:00 PM",
        location: "Innovation Hub, Dhanmondi, Dhaka",
        facebookUrl: "https://facebook.com/events/202"
      },
      {
        id: 6,
        name: "Data Science Workshop",
        organizer: "Data Analysts BD",
        bannerUrl: "/images/events/data-science.jpg",
        date: "June 25, 2025 • 10:00 AM - 4:00 PM",
        location: "Analytics Center, Mirpur, Dhaka",
        facebookUrl: "https://facebook.com/events/303"
      }
    ];
  
    return (
      <div>
        <div className="bg-[#AE2330] h-[400px] flex justify-center items-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Upcoming Events</h1>
            <p className="text-indigo-100 mt-4 max-w-2xl mx-auto">
              Stay updated with our latest events and join us to expand your knowledge and network.
            </p>
          </div>
        </div>
        
       {/* <UpcomingEvents events={upcomingEvents} /> */}
       <UpcomingEventList events={upcomingEvents} />
      </div>
    );
  }