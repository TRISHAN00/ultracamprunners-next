import Image from "next/image";
import Link from "next/link";

export default function BlogCard() {
  return (
    <div className="mx-auto p-4 bg-white rounded-xl shadow-md overflow-hidden border">
      {/* Image Section */}
      <div className="relative">
        <Image
          src="https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-28-at-2.51.57-AM-1024x576.jpeg" // Replace with the actual image path
          alt="Blog Cover"
          width={400}
          height={300}
          className="w-full w-max-6 object-cover"
        />
    
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-red-700">
          ম্যারাথনে দৌড়ানো কি শরীরের জন্য খারাপ?
        </h2>
        <p className="text-gray-700 text-sm mt-2">
          আজই লন্ডন ম্যারাথনে দৌড়াবেন অগুনতি চল্লিশ হাজার মানুষ। এর আগে লন্ডন
          ম্যারাথনে অংশ নিয়ে প্রায় প্রতি বছরই জনস্বাস্থ্যকর্মীদের মধ্যে
          খবর হওয়ার ঘটনা পাওয়া যায়...
        </p>
        <Link
          href={'/blog/blog-one'}
          className="text-red-600 font-medium flex items-center mt-3 hover:underline"
        >
          Click here
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
