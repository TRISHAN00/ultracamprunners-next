"use client";
import { useEffect, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import UpcomingEventList from "../components/upcomingEventsList/UpcomingEventList";

export default function EventsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/get-req-data/sections?type=slug&value=upcoming-events&get_section=yes&image=yes&post=yes&file=no&gallery=no`
        );
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const innerBanner = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "upcoming-inner-banner"
  );

  const upComingEvent = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "upcoming-event-list"
  )

  // Sample data - in a real application, this would come from an API or CMS
  const upcomingEvents = [
    {
      id: 1,
      name: "Dhaka City 10K Run",
      organizer: "Run Bangladesh",
      bannerUrl: "/images/events/dhaka-10k.jpg",
      date: "May 20, 2025 • 6:00 AM",
      location: "Hatirjheel, Dhaka",
      distance: "10 KM",
      type: "Timed Race",
      facebookUrl: "https://facebook.com/events/dhaka10k2025",
    },
    {
      id: 2,
      name: "Chittagong Fun Run",
      organizer: "Chittagong Runners Club",
      bannerUrl: "/images/events/ctg-funrun.jpg",
      date: "June 5, 2025 • 7:00 AM",
      location: "Patenga Beach, Chittagong",
      distance: "5 KM",
      type: "Fun Run",
      facebookUrl: "https://facebook.com/events/ctgfunrun2025",
    },
    {
      id: 3,
      name: "Gulshan Night Marathon",
      organizer: "Night Striders",
      bannerUrl: "/images/events/gulshan-night.jpg",
      date: "June 15, 2025 • 8:00 PM",
      location: "Gulshan Lake Park, Dhaka",
      distance: "8 KM",
      type: "Night Run",
      facebookUrl: "https://facebook.com/events/gulshannight2025",
    },
    {
      id: 4,
      name: "Sylhet Trail Challenge",
      organizer: "Sylhet Road Runners",
      bannerUrl: "/images/events/sylhet-trail.jpg",
      date: "July 1, 2025 • 5:30 AM",
      location: "Ratargul Swamp Forest, Sylhet",
      distance: "12 KM",
      type: "Trail Run",
      facebookUrl: "https://facebook.com/events/sylhettrail2025",
    },
    {
      id: 5,
      name: "Run for Education",
      organizer: "Hope Foundation",
      bannerUrl: "/images/events/run-education.jpg",
      date: "July 12, 2025 • 6:00 AM",
      location: "Ramna Park, Dhaka",
      distance: "4 KM",
      type: "Charity Run",
      facebookUrl: "https://facebook.com/events/runforeducation2025",
    },
    {
      id: 6,
      name: "Jessore Marathon 2025",
      organizer: "Jessore Runners",
      bannerUrl: "/images/events/jessore-marathon.jpg",
      date: "August 3, 2025 • 6:30 AM",
      location: "Town Hall Field, Jessore",
      distance: "21 KM",
      type: "Half Marathon",
      facebookUrl: "https://facebook.com/events/jessorehalf2025",
    },
  ];

  return (
    <div>
      <InnerBanner
        title={innerBanner?.section_data?.subtitle}
        img={innerBanner?.images?.list?.[0]?.full_path}
      />
      <UpcomingEventList upComingEvent={upComingEvent} events={upcomingEvents} />
    </div>
  );
}
