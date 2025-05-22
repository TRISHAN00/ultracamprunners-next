"use client";

import parse from 'html-react-parser';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import bgHero from '../../assets/explore-ouro-events.jpg';
import Button from "../Button";

export default function Hero({ data }) {
  const [settingData, setSettingData] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${API_BASE_URL}/api/get-req-data/settings-data`
      );
      const result = await res.json();
      setSettingData(result);
    }

    fetchData();
  }, [API_BASE_URL]);

  console.log(data)

  return (
    <div className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {data?.posts?.list[0]?.data?.short_desc && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <Image
            src={bgHero}
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#AD242F]/80" />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto flex items-center">
        {/* Content */}
        <div className="z-10 text-center mx-auto text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {parse(data?.section_data?.subtitle || "")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            {parse(data?.section_data?.short_desc || "")}
          </p>

          <div className="flex justify-center">
            <Button path={"/ucr-events"} title={"Explore Our Events"} />
          </div>

          {/* Runner Avatars */}
          <div className="mt-12">
            <div className="flex justify-center space-x-2">
              {data?.images?.list?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={item?.full_path}
                      alt={`Runner ${index + 1}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-lg">
              {parse(data?.section_data?.description || "")}
            </p>
          </div>
        </div>
        {/* Social Media Sidebar */}
        <aside className="absolute right-0 pt-44 md:pt-0 flex flex-col gap-2 p-4 z-10">
          {settingData?.data?.facebook && (
            <Link
              href={settingData?.data?.facebook}
              className="bg-[#1877F2] p-2 text-white rounded hover:opacity-90 transition flex justify-center"
              aria-label="Facebook"
              target="_blank"
            >
              <FaFacebook />
            </Link>
          )}

          {settingData?.data?.linkedin && (
            <Link
              href={settingData?.data?.linkedin}
              target="_blank"
              className="bg-[#0A66C2] p-2 text-white rounded hover:opacity-90 transition flex justify-center"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </Link>
          )}

          {settingData?.data?.youtube && (
            <Link
              href={settingData?.data?.youtube}
              target="_blank"
              className="bg-[#FF0000] p-2 text-white rounded hover:opacity-90 transition flex justify-center"
              aria-label="YouTube"
            >
              <FaYoutube />
            </Link>
          )}

          {settingData?.data?.whatsapp_number && (
            <Link
              href={`https://wa.me/${settingData?.data?.whatsapp_number}`}
              target="_blank"
              className="bg-[#25D366] p-2 text-white rounded hover:opacity-90 transition flex justify-center"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-3 w-3 md:h-6 md:w-6" />
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}