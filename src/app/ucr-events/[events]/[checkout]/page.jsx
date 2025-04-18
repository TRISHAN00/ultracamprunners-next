"use client";

import { Calendar, MapPin, Ruler, Truck } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EventRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventsDetail, setEventDetail] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const pathname = useParams();

  const { register, handleSubmit, reset } = useForm({ mode: "all" });

  let slug = pathname.events;

  // State for form inputs with inside_dhaka as default
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    full_address: "",
    country: "",
    city: "",
    district: "",
    thana: "",
    date_of_birth: "",
    tshirt_size: "",
    delivery_location: "inside_dhaka", // Set default to inside_dhaka
    cv: null,
  });

  // Delivery charge amounts
  const DELIVERY_CHARGE = {
    inside_dhaka: 60,
    outside_dhaka: 120,
  };

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch Event Data
  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-req-data/product-data?type=slug&value=${slug}&image=yes&post=yes&file=yes`
        );
        const data = await response.json();
        setEventDetail(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
      }
    }
    fetchEvents();
  }, [slug, API_BASE_URL]);

  const price = eventsDetail?.data?.product_data?.price || 0;
  const km = eventsDetail?.data?.product_data?.km || "";
  const date = eventsDetail?.data?.product_data?.date || "";
  const location = eventsDetail?.data?.product_data?.location || "";
  const title = eventsDetail?.data?.product_data?.title || "Event";
  const short_desc = eventsDetail?.data?.product_data?.short_desc || "";

  // Calculate delivery charge based on selected location
  const deliveryCharge = DELIVERY_CHARGE[formData.delivery_location] || 0;
  const totalPrice = Number(price) + deliveryCharge;

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || "" });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  // Handle form submission and payment
  const handleFormSubmitAndPayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    let api_services = `${API_BASE_URL}/post-req-data/form-submit`;

    let formInputData = new FormData();
    formInputData.append("form_id", "career-form");
    formInputData.append("name", formData.name);
    formInputData.append("email", formData.email);
    formInputData.append("phone", formData.phone);
    formInputData.append("full_address", formData.full_address);
    formInputData.append("country", formData.country);
    formInputData.append("district", formData.district);
    formInputData.append("city", formData.city);
    formInputData.append("thana", formData.thana);
    formInputData.append("date_of_birth", formData.date_of_birth);
    formInputData.append("t_shirt_size", formData.tshirt_size);
    formInputData.append("delivery_location", formData.delivery_location);
    formInputData.append("km", km);
    formInputData.append("payment", totalPrice); // Updated to include delivery charge
    formInputData.append("file", formData.cv);

    try {
      const response = await fetch(api_services, {
        method: "POST",
        body: formInputData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Form submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed: " + error.message);
    }

    // Payment Processing
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.full_address,
          city: formData.city,
          amount: totalPrice,
          kilometer: km,
          delivery_location: formData.delivery_location,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initiation failed!");
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C02130] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-[50px] overflow-hidden">
      {/* Header */}
      <header className="w-full bg-red-700 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg">{short_desc}</p>
      </header>

      {/* Content Section */}
      <div className="max-w-[1300px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pb-12">
        {/* Event Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          <div className="space-y-3">
            {date && (
              <div className="flex items-center gap-3">
                <Calendar className="text-red-600" />
                <p>{date}</p>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-3">
                <MapPin className="text-red-600" />
                <p>{location}</p>
              </div>
            )}
            {km && (
              <div className="flex items-center gap-3">
                <Ruler className="text-red-600" />
                <p>Distance: {km} KM</p>
              </div>
            )}

            {/* Price Breakdown Section */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-3">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Event Registration</span>
                  <span>{price} Tk</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Truck className="text-red-600 h-4 w-4" />
                    <span>
                      Delivery Charge (
                      {formData.delivery_location === "inside_dhaka"
                        ? "Inside Dhaka"
                        : "Outside Dhaka"}
                      )
                    </span>
                  </div>
                  <span>{deliveryCharge} Tk</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between items-center font-semibold">
                  <span>Total Amount</span>
                  <span>{totalPrice} Tk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form
            onSubmit={handleFormSubmitAndPayment}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Registration Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Existing Fields */}
              {[
                {
                  label: "Full Name",
                  name: "name",
                  type: "text",
                  placeholder: "Enter your full name",
                  isVisible:
                    eventsDetail?.data?.product_data?.is_name_field === "yes"
                      ? true
                      : false,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "Enter your email",
                  isVisible:
                    eventsDetail?.data?.product_data?.is_email_field === "yes"
                      ? true
                      : false,
                },
                {
                  label: "Phone",
                  name: "phone",
                  type: "tel",
                  placeholder: "Enter your phone number",
                  isVisible:
                    eventsDetail?.data?.product_data?.is_phone_number_field ===
                    "yes"
                      ? true
                      : false,
                },
                {
                  label: "Full Address",
                  name: "full_address",
                  type: "text",
                  placeholder: "Enter your full address",
                  isVisible:
                    eventsDetail?.data?.product_data?.is_full_address_field ===
                    "yes"
                      ? true
                      : false,
                },
                {
                  label: "Country",
                  name: "country",
                  type: "text",
                  placeholder: "Enter your country",
                  isVisible:
                    eventsDetail?.data?.product_data?.is_country_field === "yes"
                      ? true
                      : false,
                },
                {
                  label: "City",
                  name: "city",
                  type: "text",
                  placeholder: "Enter your city",
                  isVisible:
                    eventsDetail?.data?.product_data?.is_city_field === "yes"
                      ? true
                      : false,
                },
                {
                  label: "District",
                  name: "district",
                  type: "text",
                  placeholder: "Enter your district",
                  isVisible:
                    eventsDetail?.data?.product_data?.is_district_field ===
                    "yes"
                      ? true
                      : false,
                },
                {
                  label: "Thana",
                  name: "thana",
                  type: "text",
                  placeholder: "Enter your thana",
                  isVisible:
                    eventsDetail?.data?.product_data?.is_thana_field === "yes"
                      ? true
                      : false,
                },
                {
                  label: "Date of Birth",
                  name: "date_of_birth",
                  type: "date",
                  placeholder: "Select your birth date",
                  isVisible:
                    eventsDetail?.data?.product_data?.is_date_of_birth_field ===
                    "yes"
                      ? true
                      : false,
                },
              ].map(
                (field) =>
                  field.isVisible && (
                    <div key={field.name} className="flex flex-col">
                      <label
                        htmlFor={field.name}
                        className="text-gray-600 font-medium mb-1"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                      />
                    </div>
                  )
              )}

              {/* T-Shirt Size Dropdown */}
              {eventsDetail?.data?.product_data?.is_tshirt_size_field ===
                "yes" && (
                <div className="flex flex-col">
                  <label
                    htmlFor="tshirt_size"
                    className="text-gray-600 font-medium"
                  >
                    T-shirt Size
                  </label>
                  <select
                    id="tshirt_size"
                    name="tshirt_size"
                    value={formData.tshirt_size}
                    onChange={handleChange}
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="">Select Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                    <option value="XXXXL">XXXXL</option>
                  </select>
                </div>
              )}

              {/* NID Upload */}
              {eventsDetail?.data?.product_data?.is_cv_upload_field ===
              "yes" ? (
                <div className="flex flex-col">
                  <label htmlFor="nid" className="text-gray-600 font-medium">
                    Upload NID
                  </label>
                  <input
                    id="nid"
                    type="file"
                    name="nid"
                    onChange={handleFileChange}
                    className="w-full border rounded p-2 bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              ) : (
                ""
              )}

              {/* Read-Only Fields */}
              {eventsDetail?.data?.product_data?.is_km_field === "yes" && (
                <div className="flex flex-col">
                  <label htmlFor="km" className="text-gray-600 font-medium">
                    Distance
                  </label>
                  <input
                    type="text"
                    name="km"
                    value={`${km} KM`}
                    readOnly
                    className="w-full border rounded p-2 bg-gray-100"
                  />
                </div>
              )}

              {eventsDetail?.data?.product_data?.is_payment_field === "yes" && (
                <div className="flex flex-col">
                  <label
                    htmlFor="payment"
                    className="text-gray-600 font-medium"
                  >
                    Payment Amount
                  </label>
                  <input
                    type="text"
                    name="payment"
                    value={`${totalPrice} TK`}
                    readOnly
                    className="w-full border rounded p-2 bg-gray-100"
                  />
                </div>
              )}

              {/* Delivery Location Field */}
              <div className="md:col-span-2">
                <label className="text-gray-600 font-medium mb-2 block">
                  Delivery Location
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="delivery_location"
                      value="inside_dhaka"
                      checked={formData.delivery_location === "inside_dhaka"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Inside of Dhaka (60 Tk)</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="delivery_location"
                      value="outside_dhaka"
                      checked={formData.delivery_location === "outside_dhaka"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Outside of Dhaka (120 Tk)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-800 transition"
            >
              {loading ? "Processing..." : `Register & Pay (${totalPrice} Tk)`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}