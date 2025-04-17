"use client";
import { useEffect, useState } from "react";
import person1 from '../../app/assets/crew/person-01.jpg';
import person from '../../app/assets/crew/person.jpg';
import InnerBanner from "../components/InnerBanner";
import TeamSection from "../components/ucrCrew/TeamSection";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    title: "Volunteer",
    image: person,
    socials: [
      { type: "linkedin", url: "#" },
      { type: "facebook", url: "#" },
      { type: "youtube", url: "#" },
      { type: "website", url: "#" },
      { type: "behance", url: "#" },
    ],
  },
  {
    id: 2,
    name: "Michael Smith",
    title: "Volunteer",
    image: person1,
    socials: [
      { type: "linkedin", url: "#" },
      { type: "facebook", url: "#" },
      { type: "youtube", url: "#" },
      { type: "website", url: "#" },
      { type: "twitter", url: "#" },
      { type: "instagram", url: "#" },
      { type: "github", url: "#" },
    ],
  },
  {
    id: 3,
    name: "Jane Johnson",
    title: "Volunteer",
    image: person,
    socials: [
      { type: "linkedin", url: "#" },
      { type: "facebook", url: "#" },
      { type: "youtube", url: "#" },
      { type: "website", url: "#" },
    ],
  },
  {
    id: 4,
    name: "David Lee",
    title: "Volunteer",
    image: person1,
    socials: [
      { type: "linkedin", url: "#" },
      { type: "facebook", url: "#" },
    ],
  },
  {
    id: 5,
    name: "Emily Davis",
    title: "Volunteer",
    image: person,
    socials: [
      { type: "linkedin", url: "#" },
      { type: "facebook", url: "#" },
      { type: "instagram", url: "#" },
      { type: "website", url: "#" },
      { type: "github", url: "#" },
    ],
  },
  {
    id: 6,
    name: "Robert Brown",
    title: "Volunteer",
    image: person1,
    socials: [
      { type: "linkedin", url: "#" },
      { type: "facebook", url: "#" },
      { type: "instagram", url: "#" },
    ],
  },
  {
    id: 7,
    name: "Sophia Wilson",
    title: "Volunteer",
    image: person,
    socials: [
      { type: "linkedin", url: "#" },
      { type: "facebook", url: "#" },
      { type: "youtube", url: "#" },
    ],
  },
  {
    id: 8,
    name: "Liam Martinez",
    title: "Volunteer",
    image: person1,
    socials: [
      { type: "linkedin", url: "#" },
      { type: "facebook", url: "#" },
      { type: "website", url: "#" },
    ],
  },
];

export default function UCRRaceCrew() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/get-req-data/sections?type=slug&value=ucr-race-crew&get_section=yes&image=yes&post=yes&file=no&gallery=no`
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
    (f) => f?.section_data?.slug === "ucr-race-crew-banner"
  );

  return (
    <>
      <InnerBanner
        title={innerBanner?.section_data?.subtitle}
        img={innerBanner?.images?.list?.[0]?.full_path}
      />
      <TeamSection teamMembers={teamMembers } />
    </>
  );
}
