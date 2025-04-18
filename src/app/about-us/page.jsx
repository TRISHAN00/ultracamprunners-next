"use client";
import { useEffect, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import About from "../components/home/About";

export default function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        // Call both APIs simultaneously
        const [aboutRes, bannerRes] = await Promise.all([
          fetch(`${API_BASE_URL}/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=no&gallery=no`),
          fetch(`${API_BASE_URL}/get-req-data/sections?type=slug&value=about-us-page&get_section=yes&image=yes&post=no&file=no&gallery=no`)
        ]);

        const aboutResult = await aboutRes.json();
        const bannerResult = await bannerRes.json();

        setAboutData(aboutResult);
        setBannerData(bannerResult);
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

  const aboutUs = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-us"
  );

  const innerBanner = bannerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-banner"
  );

  return (
    <>
      <InnerBanner
        title={innerBanner?.section_data?.subtitle}
        img={innerBanner?.images?.list?.[0]?.full_path}
      />
      <About data={aboutUs} />
    </>
  );
}
