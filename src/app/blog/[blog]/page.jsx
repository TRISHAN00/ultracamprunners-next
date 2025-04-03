"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

export default function BlogDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogDetail, setblogDetail] = useState();
  const path = useParams();

  console.log(blogDetail);

  useEffect(() => {
    async function fetchblogs() {
      try {
        const response = await fetch(
          `https://zoraithost.com/cms/api/get-req-data/blog-data?type=slug&value=${path.blog}`
        );
        const data = await response.json();
        setblogDetail(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchblogs();
  }, [path.blog]);

  const title = blogDetail?.data?.data?.title;
  const body = blogDetail?.data?.data?.body;
  const banner = blogDetail?.data?.images?.list?.[0]?.full_path;
  const rawDate = blogDetail?.data?.data?.date; // Assuming this is in "YYYY-MM-DD" format

  // Convert Date Format
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C02130] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6 pt-[120px] pb-[120px] ">
      <div className="max-w-[1300px] mx-auto w-full bg-white p-6 rounded-lg shadow-md">
        {/* Blog Title */}
        {title && (
          <h1 className="text-3xl font-bold text-gray-900">
            {ReactHtmlParser(title)}
          </h1>
        )}

        {/* Blog Meta */}
        <div className="flex items-center space-x-4 text-gray-500 mt-2">
          {/* <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-red-600" />
            <p>John Doe</p>
          </div> */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <p>{formattedDate}</p>
          </div>
        </div>

        {/* Blog Image with Next.js Image Optimization */}
        <div className="mt-4 w-full relative h-64">
          <Image
            src={banner}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        </div>

        {/* Blog Content */}
        <div className="mt-6 text-gray-700 space-y-5">
          {ReactHtmlParser(body)}
        </div>

      
      </div>
    </div>
  );
}
