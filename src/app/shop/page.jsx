"use client";
import { useEffect, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import ProductCard from "../components/shop/ProductCard";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        // Parallel API calls
        const [productRes, bannerRes] = await Promise.all([
          fetch(
            `${API_BASE_URL}/get-req-data/all-products?image=yes&post=no&file=&specification=&gallery=&variation=&limit=`
          ),
          fetch(
            `${API_BASE_URL}/get-req-data/sections?type=slug&value=shop&get_section=yes&image=yes&post=no&file=no&gallery=no`
          ),
        ]);

        const productsData = await productRes.json();
        const bannerData = await bannerRes.json();

        if (productsData.status === 200) {
          const filteredProducts = productsData.data.filter(
            (product) => product.product_data.category_slug !== "event"
          );
          setProducts(filteredProducts);
        } else {
          setError("Failed to fetch products");
        }

        if (bannerData.status === 200) {
          const bannerSection = bannerData.data.sections.find(
            (section) => section?.section_data?.slug === "shop-banner"
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

      <section className="pt-[120px] pb-[120px]">


        <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => {
            const thumbnail = product?.images?.list?.[0]?.full_path;
            const {
              id,
              title,
              price,
              category_title,
              is_sold_out,
              description,
            } = product.product_data;

            return (
              <ProductCard
                key={id}
                image={thumbnail}
                category={category_title}
                name={title}
                price={price}
                description={description}
                isSoldOut={is_sold_out === "yes"}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
