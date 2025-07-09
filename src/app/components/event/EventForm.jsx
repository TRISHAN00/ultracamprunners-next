"use client";
import { useState } from "react";

export default function EventForm({ priceParam }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: priceParam,
    full_address: "",
    country: "",
    city: "",
    thana: "",
    date_of_birth: "",
    t_shirt_size: "",
    km: "",
    gender: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file: file }); // ✅ correct key
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = { ...formData };
      delete body.file;

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`❌ API Error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("❌ Payment initiation failed.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to connect to server. See console.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-start justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Payment Now</h2>

        <label className="block">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </label>

        <label className="block">
          Your Email
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </label>

        <label className="block">
          Your Phone
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </label>

        {/* <label className="block">
          Amount (BDT)
          <input
            type="number"
            name="amount"
            placeholder="Amount (BDT)"
            value={formData.amount}
            onChange={handleChange}
            readOnly
            className="w-full p-2 border"
            required
          />
        </label> */}

        <label className="block">
          Full Address
          <input
            type="text"
            name="full_address"
            placeholder="Full Address"
            value={formData.full_address}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </label>

        <label className="block">
          Country
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </label>

        <label className="block">
          City
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </label>

        <label className="block">
          Thana
          <input
            type="text"
            name="thana"
            placeholder="Thana"
            value={formData.thana}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </label>

        <label className="block">
          Date of Birth
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </label>

        <label className="block">
          T-shirt Size
          <select
            name="t_shirt_size"
            className="w-full p-2 border"
            value={formData.t_shirt_size || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select T-shirt Size</option>
            <optgroup label="Adult Sizes">
              <option value="XS">XS - 36”/25”</option>
              <option value="S">S - 38”/26”</option>
              <option value="M">M - 40”/27”</option>
              <option value="L">L - 42”/28”</option>
              <option value="XL">XL - 44”/29”</option>
              <option value="2XL">2XL - 46”/30”</option>
              <option value="3XL">3XL - 48”/31”</option>
            </optgroup>
            <optgroup label="Kids Sizes">
              <option value="3-4 Years">3-4 Years - 26”/18”</option>
              <option value="5-6 Years">5-6 Years - 28”/19”</option>
              <option value="7-8 Years">7-8 Years - 30”/20”</option>
              <option value="9-10 Years">9-10 Years - 32”/22”</option>
              <option value="11-12 Years">11-12 Years - 34”/24”</option>
            </optgroup>
          </select>
        </label>

        <label className="block">
          KM Category
          <select
            name="km"
            value={formData.km}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="">Select KM Category</option>
            <option value="21.1KM">21.1KM</option>
            <option value="15KM">15KM</option>
            <option value="7.5KM">7.5KM</option>
            <option value="1KM">1KM (kids 3-9 years)</option>
          </select>
        </label>

        <label className="block">
          Gender
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Redirecting..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
