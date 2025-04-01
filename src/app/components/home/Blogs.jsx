
import BlogCard from '../BlogCard'

const blogPosts = [
  {
    id: 1,
    title: 'ম্যারাথনে দৌড়ানো কি শরীরের জন্য খারাপ?',
    description:
      'আজই নতুন ম্যারাথন দৌড়বেন অভ্যস্ত চলিল্লিশ হাজার মানুষ। এর মাঝে নতুন ম্যারাথন অংশ নিয়ে লাভ প্রতি বছরই অংশগ্রহণকারীদের মধ্যে আগ্রহ বেশায় ধরণ পাওয়া যায়।',
    image:
      'https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-28-at-2.51.57-AM-1024x576.jpeg',
    slug: 'marathon-health',
  },
  {
    id: 2,
    title: 'সুস্থ্যতের জন্য ম্যারাথন দৌড়',
    description:
      'নিজেকে ফিট রাখতে শরীরচর্চার কোনো বিকল্প নেই। আর ব্যায়ামের মধ্যে সবচেয়ে ভালো হলো দৌড়। যদি সকালে নিয়মিত পারেন তাহলে শুধু নিজেই ফিট থাকবেন না বরং বিভিন্ন রকমের রোগের সঙ্গে লড়াই করতে পারবেন।',
    image:
      'https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-28-at-2.46.33-AM-1024x576.jpeg',
    slug: 'marathon-fitness',
  },
  {
    id: 3,
    title: 'ম্যারাথনের ইতিহাস ও দূরত্ব',
    description:
      'ম্যারাথনের উৎপত্তি জানতে হলে আমাদের প্রথমেই যেতে হবে সেই প্রাচীন গ্রিসে, যিস্টপূর্ব পঞ্চম শতাব্দীর শেষের দিকের ঘটনায়।',
    image:
      'https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-09-23-at-4.26.11-PM.jpeg',
    slug: 'marathon-history',
  },
]

export default function BlogSection() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold md:font-black">
            Read Our <span className="text-[#C02130]">Blogs</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard/>
          <BlogCard/>
          <BlogCard/>
        </div>
      </div>
    </section>
  )
}
