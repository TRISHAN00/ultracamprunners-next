"use client";

import { useEffect, useState } from "react";
import About from "./components/home/About";
import BlogSection from "./components/home/Blogs";
import UpcomingEvents from "./components/home/Events";
import ExploreEvents from "./components/home/ExploreEvents";
import Features from "./components/home/Features";
import GallerySection from "./components/home/Gallery";
import Hero from "./components/home/Hero";
import JoinUCR from "./components/home/JoinUCR";
import Services from "./components/home/Services";
import StatsSection from "./components/home/Stats";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=no&gallery=no`
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

  const hero = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "hero"
  );
  const aboutUs = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-us"
  );
  const exploreEvent = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "explore-our-events"
  );
  const upcomingEvents = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "our-upcoming-events"
  );
  const features = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "our-features"
  );
  const joinUs = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "join-us"
  );
  const gallery = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "our-gallery"
  );

  const counter = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "counter"
  );


  return (
    <>
      <Hero data={hero} />
      <About data={aboutUs} />
      <ExploreEvents data={exploreEvent} />
      <UpcomingEvents title={upcomingEvents} />
      <Features data={features} />
      <JoinUCR data={joinUs} />
      <GallerySection data={gallery} />
      <BlogSection />
      <StatsSection data={counter} />
      <Services />
    </>
  );
}
