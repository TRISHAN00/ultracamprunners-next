"use client";

import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import InnerBanner from "../components/InnerBanner";

export default function UCREvents() {
  const [events, setEvents] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsRes, bannerRes] = await Promise.all([
          fetch(
            `${API_BASE_URL}/get-req-data/all-products?image=yes&post=no&file=&specification=&gallery=&variation=&limit=`
          ),
          fetch(
            `${API_BASE_URL}/get-req-data/sections?type=slug&value=events&get_section=yes&image=yes&post=no&file=no&gallery=no`
          ),
        ]);

        const eventsData = await eventsRes.json();
        const bannerData = await bannerRes.json();

        if (eventsData.status === 200) {
          const filteredEvents = eventsData.data.filter(
            (event) => event.product_data.category_slug === "event"
          );
          setEvents(filteredEvents);
        } else {
          setError("Failed to fetch events");
        }

        if (bannerData.status === 200) {
          const bannerSection = bannerData.data.sections.find(
            (item) => item?.section_data?.slug === "event-banner"
          );
          setBanner(bannerSection);
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_BASE_URL]);

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
    <>
      <InnerBanner
        title={banner?.section_data?.subtitle}
        img={banner?.images?.list?.[0]?.full_path}
      />

      <section className="py-32  md:px-6 lg:px-8 max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(({ product_data, images }) => (
            <EventCard
              key={product_data.id}
              title={product_data.title}
              featureImage={images?.list?.[0]?.full_path || "/placeholder.jpg"}
              organizer={product_data?.organized}
              location={product_data?.location || "N/A"}
              date={product_data?.date}
              price={product_data?.price}
              slug={product_data.slug}
            />
          ))}
        </div>
      </section>
    </>
  );
}
