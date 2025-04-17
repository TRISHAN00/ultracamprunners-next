"use client";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";


export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-req-data/blog-list`
        );
        const data = await response.json();

        if (data.status === 200) {
          // Filtering only 'blog' category
          setBlogs(data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [API_BASE_URL]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C02130] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 pt-[120px] ">
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-4xl text-[#C02130] md:text-5xl lg:text-[64px] font-bold md:font-black text-center mb-12">
          Blog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.data?.map((blog, index) => {
            return (
              <BlogCard key={index} blog={blog}    />
            )
          })}
        </div>
      </div>
    </section>
  );
}
