"use client";
import { useEffect, useState } from "react";
import ProductCard from "../components/shop/ProductCard";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchproducts() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-req-data/all-products?image=yes&post=no&file=&specification=&gallery=&variation=&limit=`
        );
        const data = await response.json();

        if (data.status === 200) {
          // Filtering only 'Event' category
          const filteredproducts = data.data.filter(
            (event) => event.product_data.category_slug !== "event"
          );
          setProducts(filteredproducts);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchproducts();
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
    <div className="pt-[120px] pb-[120px]">
      <h2 className="text-4xl text-[#C02130] md:text-5xl lg:text-[64px] font-bold md:font-black text-center mb-12">
        Products
      </h2>
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products?.length > 0
          ? products.map((product) => {
              const thumbnail = product?.images?.list?.[0]?.full_path;
              const { id, title, price, category_title, is_sold_out } =
                product?.product_data;

              return (
                <ProductCard
                  key={id} // Ensure each item has a unique key
                  image={thumbnail}
                  category={category_title}
                  name={title}
                  price={price}
                  description={product.product_data.description}
                  isSoldOut={product?.product_data?.is_sold_out === "yes"}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
