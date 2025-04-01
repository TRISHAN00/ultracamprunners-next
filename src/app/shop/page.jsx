import ProductCard from "../components/shop/ProductCard"

export default function Page() {
  return (
    <div className="pt-[120px] pb-[120px]">
      <h2 className="text-4xl text-[#C02130] md:text-5xl lg:text-[64px] font-bold md:font-black text-center mb-12">
        Events
      </h2>
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <ProductCard
          image="https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-23-at-1.21.23-AM-300x300.jpeg"
          category="T-Shirt"
          name="Classic Black T-Shirt"
          price="25"
          description="A comfortable and stylish black t-shirt for everyday wear."
          isSoldOut={false}
        />
        <ProductCard
          image="https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-23-at-1.21.23-AM-300x300.jpeg"
          category="T-Shirt"
          name="White Cotton T-Shirt"
          price="20"
          description="Made with premium cotton for a soft feel."
          isSoldOut={true} // Sold Out
        />
        <ProductCard
          image="https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-23-at-1.21.23-AM-300x300.jpeg"
          category="T-Shirt"
          name="Classic Black T-Shirt"
          price="25"
          description="A comfortable and stylish black t-shirt for everyday wear."
          isSoldOut={false}
        />
        <ProductCard
          image="https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-23-at-1.21.23-AM-300x300.jpeg"
          category="T-Shirt"
          name="White Cotton T-Shirt"
          price="20"
          description="Made with premium cotton for a soft feel."
          isSoldOut={true} // Sold Out
        />
      </div>
    </div>
  )
}
