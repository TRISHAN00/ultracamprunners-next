"use client";

import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

export default function UCREvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `https://zoraithost.com/cms/api/get-req-data/all-products?image=yes&post=no&file=&specification=&gallery=&variation=&limit=`
        );
        const data = await response.json();

        if (data.status === 200) {
          // Filtering only 'Event' category
          const filteredEvents = data.data.filter(
            (event) => event.product_data.category_slug === "event"
          );
          setEvents(filteredEvents);
        } else {
          setError("Failed to fetch events");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C02130] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 pt-[120px]">
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-4xl text-[#C02130] md:text-5xl lg:text-[64px] font-bold md:font-black text-center mb-12">
          Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(({ product_data, images }) => {
            return (
              <EventCard
                key={product_data.id}
                title={product_data.title}
                featureImage={
                  images?.list?.[0]?.full_path || "/placeholder.jpg"
                }
                organizer={product_data?.organized}
                location={product_data?.location || "N/A"}
                date={product_data?.date}
                price={product_data?.price}
                slug={product_data.slug}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
