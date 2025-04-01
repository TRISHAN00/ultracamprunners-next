"use client";

import { Calendar, Facebook, Linkedin, Twitter, User } from "lucide-react";
import Image from "next/image";

export default function BlogDetails() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6 pt-[120px] ">
      <div className="max-w-[1300px] mx-auto w-full bg-white p-6 rounded-lg shadow-md">
        {/* Blog Title */}
        <h1 className="text-3xl font-bold text-gray-900">
          The Future of Web Development in 2025
        </h1>

        {/* Blog Meta */}
        <div className="flex items-center space-x-4 text-gray-500 mt-2">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-red-600" />
            <p>John Doe</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <p>March 19, 2025</p>
          </div>
        </div>

        {/* Blog Image with Next.js Image Optimization */}
        <div className="mt-4 w-full relative h-64">
          <Image
            src="https://source.unsplash.com/800x400/?technology,website"
            alt="Blog Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        </div>

        {/* Blog Content */}
        <div className="mt-6 text-gray-700 space-y-4">
          <p>
            Web development is rapidly evolving with new technologies like AI, WebAssembly,
            and Jamstack. In 2025, we can expect more automation, improved performance, and
            user-friendly experiences across the web.
          </p>

          <p>
            The demand for **serverless architectures** and **low-code platforms** is rising.
            Developers are adopting Next.js, Remix, and SvelteKit for optimized frontend
            performance.
          </p>

          <blockquote className="border-l-4 border-red-600 pl-4 italic text-gray-600">
            "The future belongs to those who embrace change and innovation in web development."
          </blockquote>

          <p>
            Security and **SEO improvements** will continue to dominate the industry, ensuring
            websites are fast and accessible for all users.
          </p>
        </div>

        {/* Share Section */}
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <p className="text-gray-600 font-semibold">Share this article:</p>
          <div className="flex gap-3">
            <button className="flex items-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              <Facebook className="w-4 h-4 mr-1" /> Facebook
            </button>
            <button className="flex items-center bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500">
              <Twitter className="w-4 h-4 mr-1" /> Twitter
            </button>
            <button className="flex items-center bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-900">
              <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
