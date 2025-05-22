"use client";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import InnerBanner from "../components/InnerBanner";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch blogs and banner in parallel
        const [blogsRes, bannerRes] = await Promise.all([
          fetch(`${API_BASE_URL}/get-req-data/blog-list`),
          fetch(
            `${API_BASE_URL}/get-req-data/sections?type=slug&value=blog&get_section=yes&image=yes&post=no&file=no&gallery=no`
          ),
        ]);

        const blogsData = await blogsRes.json();
        const bannerData = await bannerRes.json();

        if (blogsData.status === 200) {
          setBlogs(blogsData?.data || []);
        } else {
          setError("Failed to fetch blogs");
        }

        if (bannerData.status === 200) {
          const bannerSection = bannerData.data.sections.find(
            (section) => section?.section_data?.slug === "blog-banner"
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
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius voluptatum culpa dolor veritatis officia quam ratione quos ipsam. Non laudantium officia incidunt quod doloremque minus deleniti possimus officiis atque!
      <section className="py-32 px-4 md:px-6 lg:px-8 pt-[120px]">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
