'use client'
import { useEffect, useState } from "react";
import About from "../components/home/About";

export default function AboutUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://zoraithost.com/cms/api/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=no&gallery=no"
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
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C02130] rounded-full animate-spin"></div>
      </div>
    );
  }

  const aboutUs = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-us"
  );
  return (
    <div className="pt-[120px] pb-[120px]">
      <About data={aboutUs} />
    </div>
  );
}
