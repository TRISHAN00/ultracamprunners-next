"use client";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import EventCard from "../EventCard";

export default function UpcomingEvents({ title }) {
  const [events, setEvents] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-req-data/all-products?image=yes&post=no&file=&specification=&gallery=&variation=&limit=`
        );
        const data = await response.json();

        if (data.status === 200) {
          // Filtering only 'Event' category
          const filteredEvents = data?.data?.filter(
            (event) => event.product_data.category_slug === "event"
          );
          setEvents(filteredEvents);
        } else {
          setError("Failed to fetch events");
        }
      } catch (err) {
        setError("Error fetching data");
      } 
    }
    fetchEvents();
  }, [API_BASE_URL]);

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">
        {title?.section_data?.subtitle && (
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold md:font-black text-center mb-12">
            {parse(title?.section_data?.subtitle)}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EventCard
              key={event?.product_data?.id}
              title={event?.product_data?.title}
              featureImage={
                event?.images?.list?.[0]?.full_path || "/placeholder.jpg"
              }
              organizer={event?.product_data?.organized}
              location={event?.product_data?.location || "N/A"}
              date={event?.product_data?.date}
              price={event?.product_data?.price}
              slug={event?.product_data?.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
