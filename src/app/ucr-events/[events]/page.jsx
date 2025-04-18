/* eslint-disable @next/next/no-img-element */
"use client";
import parse from "html-react-parser";
import { AlertTriangle, Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventsDetail, setEventDetail] = useState();
  const path = useParams();


  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-req-data/product-data?type=slug&value=${path.events}&image=yes&post=yes&file=yes`
        );
        const data = await response.json();

        console.log(data)
        setEventDetail(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [path.events, API_BASE_URL]);

  const date = eventsDetail?.data?.product_data?.date;
  const location = eventsDetail?.data?.product_data?.location;

  const features = eventsDetail?.data?.images?.list?.filter(
    (f) => f?.feature === "on"
  );
  const importantNotes = eventsDetail?.data?.posts?.list?.find(
    (f) => f?.data?.slug === "important-notes"
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C02130] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
          {eventsDetail?.data?.images?.list?.find((f) => f?.banner === "on")
            ?.full_path && (
            <Image
              src={
                eventsDetail.data.images.list.find((f) => f?.banner === "on")
                  ?.full_path
              }
              alt="Event Image"
              fill
              className="object-cover"
              priority
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#a52931]/80 to-[#333a3f]/80 flex items-center">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {eventsDetail?.data?.product_data?.title}
              </h1>
              <div className="flex items-center text-white/90 space-x-6">
                {eventsDetail?.data?.product_data?.organized && (
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{eventsDetail?.data?.product_data?.organized}</span>
                  </div>
                )}

                {location && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Event Details
                </h2>
                {eventsDetail?.data?.product_data?.short_desc && (
                  <p className="text-gray-600">
                    {eventsDetail?.data?.product_data?.short_desc}
                  </p>
                )}

                <div className="space-y-4 mt-4">
                  {date && (
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-3 text-[#a52931]" />
                      <span>{date}</span>
                    </div>
                  )}

                  {eventsDetail?.data?.product_data?.description && (
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-5 w-5 mr-3 text-[#a52931]" />
                      <div>
                        <p>Cut-off Times:</p>
                        {parse(eventsDetail?.data?.product_data?.description)}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* What You'll Get */}
              {features?.length > 0 && (
                <section className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What You&apos;ll Get
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features?.map((feature, index) => {
                      return (
                        <div
                          key={index + 1}
                          className="flex cursor-pointer flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <img
                            className="h-8 w-8 text-[#a52931] mb-3"
                            src={feature?.full_path}
                            alt={feature?.short_title}
                          />
                          <h3 className="font-semibold text-gray-900">
                            {feature?.short_title}
                          </h3>
                          <p className="text-sm text-gray-600 text-center mt-2">
                            {feature?.short_desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Select Your Distance
                </h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-[#a52931] transition-colors group cursor-pointer">
                    {eventsDetail?.data?.product_data?.km && (
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#a52931]">
                        {eventsDetail?.data?.product_data?.km} KM
                      </h3>
                    )}
                    {eventsDetail?.data?.product_data?.price && (
                      <span className="text-[#a52931] font-bold">
                        ৳ {eventsDetail?.data?.product_data?.price}
                      </span>
                    )}

                    <p className="text-sm text-gray-600">
                      Challenge yourself with this distance.
                    </p>
                    <div className="mt-4">
                      <Link href={`/ucr-events/${path.events}/checkout`}>
                        <button className="w-full bg-[#333a3f] text-white py-2 px-4 rounded-md hover:bg-[#a52931] transition-colors">
                          Select
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {importantNotes?.data?.description && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-[#a52931]" />
                    Important Notes
                  </h2>
                  {importantNotes?.data?.description &&
                    parse(importantNotes?.data?.description)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
