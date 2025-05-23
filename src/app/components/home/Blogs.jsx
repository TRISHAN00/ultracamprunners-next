import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(`${API_BASE_URL}/get-req-data/blog-list`);
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
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center space-y-4 mb-12">
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.data?.map((blog, index) => {
            return <BlogCard key={index} blog={blog} />;
          })}
        </div>
      </div>
    </section>
  );
}
