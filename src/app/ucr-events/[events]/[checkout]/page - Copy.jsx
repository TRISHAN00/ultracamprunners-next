"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle,
  MapPin,
  Ruler,
  Truck,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EventRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventsDetail, setEventDetail] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pathname = useParams();
  const { reset } = useForm({ mode: "all" });

  let slug = pathname.events;

  // State for form inputs
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
    delivery_location: "",
    kit_collection: "",
    cv: null,
  });

  // Delivery charge amounts
  const DELIVERY_CHARGE = {
    without_tShirt: 0,
    inside_dhaka: 60,
    outside_dhaka: 120,
  };

  // Validation rules
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s.'-]+$/,
      message: "Name must contain only letters, spaces, and common punctuation",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    phone: {
      required: true,
      pattern: /^(\+88)?01[3-9]\d{8}$/,
      message:
        "Please enter a valid Bangladeshi phone number (e.g., 01XXXXXXXXX)",
    },
    full_address: {
      required: true,
      minLength: 10,
      message: "Please enter a complete address (minimum 10 characters)",
    },
    country: {
      required: true,
      minLength: 2,
      message: "Please enter a valid country name",
    },
    city: {
      required: true,
      minLength: 2,
      message: "Please enter a valid city name",
    },
    district: {
      required: true,
      minLength: 2,
      message: "Please enter a valid district name",
    },
    thana: {
      required: true,
      minLength: 2,
      message: "Please enter a valid thana name",
    },
    date_of_birth: {
      required: true,
      validate: (value) => {
        const today = new Date();
        const dob = new Date(value);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
          age--;
        }

        return age >= 5 && age <= 100;
      },
      message: "Age must be between 5 and 100 years",
    },
  };

  function calculateAge(dobString) {
    if (!dobString) return 0;

    const today = new Date();
    const dob = new Date(dobString);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }

  // Validate individual field
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return null;

    if (rule.required && (!value || value.trim() === "")) {
      return `${name
        .replace("_", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())} is required`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `${name
        .replace("_", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())} must be at least ${
        rule.minLength
      } characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }

    if (rule.validate && !rule.validate(value)) {
      return rule.message;
    }

    return null;
  };

  // Validate entire form
  const validateForm = () => {
    const errors = {};
    const fieldsToValidate = Object.keys(validationRules);

    fieldsToValidate.forEach((field) => {
      const fieldVisible = getFieldVisibility(field);
      if (fieldVisible) {
        const error = validateField(field, formData[field]);
        if (error) {
          errors[field] = error;
        }
      }
    });

    // Additional validations
    if (formData.kit_collection === "with_tshirt" && !formData.tshirt_size) {
      errors.tshirt_size =
        "T-shirt size is required when selecting kit with T-shirt";
    }

    if (
      formData.kit_collection === "with_tshirt" &&
      !formData.delivery_location
    ) {
      errors.delivery_location = "Please select a delivery location";
    }

    if (!formData.kit_collection) {
      errors.kit_collection = "Please select kit collection option";
    }

    // File validation
    const currentAge = calculateAge(formData.date_of_birth);
    const cvRequired =
      eventsDetail?.data?.product_data?.is_cv_upload_field === "yes" ||
      currentAge >= 50;

    if (cvRequired && !formData.cv) {
      errors.cv = "NID upload is required";
    }

    if (formData.cv) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(formData.cv.type)) {
        errors.cv = "Please upload a valid file (JPG, PNG, or PDF)";
      } else if (formData.cv.size > maxSize) {
        errors.cv = "File size must be less than 5MB";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Get field visibility
  const getFieldVisibility = (fieldName) => {
    const fieldMap = {
      name: eventsDetail?.data?.product_data?.is_name_field === "yes",
      email: eventsDetail?.data?.product_data?.is_email_field === "yes",
      phone: eventsDetail?.data?.product_data?.is_phone_number_field === "yes",
      full_address:
        eventsDetail?.data?.product_data?.is_full_address_field === "yes",
      country: eventsDetail?.data?.product_data?.is_country_field === "yes",
      city: eventsDetail?.data?.product_data?.is_city_field === "yes",
      district: eventsDetail?.data?.product_data?.is_district_field === "yes",
      thana: eventsDetail?.data?.product_data?.is_thana_field === "yes",
      date_of_birth:
        eventsDetail?.data?.product_data?.is_date_of_birth_field === "yes",
    };

    return fieldMap[fieldName] || false;
  };

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch Event Data
  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-req-data/product-data?type=slug&value=${slug}&image=yes&post=yes&file=yes`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEventDetail(data);
      } catch (err) {
        setError("Failed to load event details. Please refresh the page.");
        console.error("Error fetching event data:", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchEvents();
    }
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

  // Current age calculate
  const currentAge = calculateAge(formData.date_of_birth);

  // Handle text input change with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || "" });

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Real-time validation for specific fields
    if (["email", "phone"].includes(name) && value) {
      const error = validateField(name, value);
      if (error) {
        setValidationErrors((prev) => ({ ...prev, [name]: error }));
      }
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cv: file });

    // Clear file validation error
    if (validationErrors.cv) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.cv;
        return newErrors;
      });
    }
  };

  // Handle form submission and payment
  const handleFormSubmitAndPayment = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    let api_services = `${API_BASE_URL}/post-req-data/form-submit`;

    let formInputData = new FormData();
    formInputData.append("form_id", "event-form");
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
    formInputData.append("kit_collection", formData.kit_collection);
    formInputData.append("km", km);
    formInputData.append("payment", totalPrice);
    if (formData.cv) {
      formInputData.append("file", formData.cv);
    }

    try {
      const response = await fetch(api_services, {
        method: "POST",
        body: formInputData,
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.status}`);
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
            kit_collection: formData.kit_collection,
          }),
        });

        if (!res.ok) {
          throw new Error(`Payment API error: ${res.status}`);
        }

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error("Payment URL not received");
        }
      } catch (error) {
        console.error("Payment Error:", error);
        setError(
          "Payment processing failed. Please try again or contact support."
        );
      }

      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        "Failed to submit registration. Please check your information and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Error Alert Component
  const ErrorAlert = ({ message }) => (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );

  // Input Field Component
  const InputField = ({ field, value, onChange, error, required = false }) => (
    <div className="flex flex-col">
      <label
        htmlFor={field.name}
        className="text-gray-700 font-medium mb-2 flex items-center"
      >
        {field.label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={field.name}
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        className={`w-full border rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
          error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        required={required}
      />
      {error && (
        <p className="text-red-600 text-sm mt-1 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error && !eventsDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <ErrorAlert message={error} />
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {short_desc && <p className="text-xl opacity-90">{short_desc}</p>}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && <ErrorAlert message={error} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Event Details
            </h2>

            <div className="space-y-4 mb-6">
              {date && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="text-red-600 h-5 w-5" />
                  <div>
                    <p className="font-medium text-gray-800">Date</p>
                    <p className="text-gray-600">{date}</p>
                  </div>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="text-red-600 h-5 w-5" />
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <p className="text-gray-600">{location}</p>
                  </div>
                </div>
              )}
              {km && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Ruler className="text-red-600 h-5 w-5" />
                  <div>
                    <p className="font-medium text-gray-800">Distance</p>
                    <p className="text-gray-600">{km} KM</p>
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown Section */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Price Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Event Registration</span>
                  <span className="font-semibold text-gray-800">
                    {price} Tk
                  </span>
                </div>

                {formData.kit_collection === "with_tshirt" && (
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <Truck className="text-red-600 h-4 w-4" />
                      <span className="text-gray-700">
                        {formData.delivery_location === "inside_dhaka"
                          ? "Delivery (Inside Dhaka)"
                          : "Delivery (Outside Dhaka)"}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {deliveryCharge} Tk
                    </span>
                  </div>
                )}

                <div className="border-t pt-3 mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    {totalPrice} Tk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleFormSubmitAndPayment} className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Registration Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dynamic Fields */}
                {[
                  {
                    label: "Full Name",
                    name: "name",
                    type: "text",
                    placeholder: "Enter your full name",
                    isVisible: getFieldVisibility("name"),
                  },
                  {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    placeholder: "Enter your email address",
                    isVisible: getFieldVisibility("email"),
                  },
                  {
                    label: "Phone Number",
                    name: "phone",
                    type: "tel",
                    placeholder: "01XXXXXXXXX",
                    isVisible: getFieldVisibility("phone"),
                  },
                  {
                    label: "Full Address",
                    name: "full_address",
                    type: "text",
                    placeholder: "Enter your complete address",
                    isVisible: getFieldVisibility("full_address"),
                  },
                  {
                    label: "Country",
                    name: "country",
                    type: "text",
                    placeholder: "Enter your country",
                    isVisible: getFieldVisibility("country"),
                  },
                  {
                    label: "City",
                    name: "city",
                    type: "text",
                    placeholder: "Enter your city",
                    isVisible: getFieldVisibility("city"),
                  },
                  {
                    label: "District",
                    name: "district",
                    type: "text",
                    placeholder: "Enter your district",
                    isVisible: getFieldVisibility("district"),
                  },
                  {
                    label: "Thana/Upazila",
                    name: "thana",
                    type: "text",
                    placeholder: "Enter your thana",
                    isVisible: getFieldVisibility("thana"),
                  },
                  {
                    label: "Date of Birth",
                    name: "date_of_birth",
                    type: "date",
                    placeholder: "",
                    isVisible: getFieldVisibility("date_of_birth"),
                  },
                ].map(
                  (field) =>
                    field.isVisible && (
                      <InputField
                        key={field.name}
                        field={field}
                        value={formData[field.name]}
                        onChange={handleChange}
                        error={validationErrors[field.name]}
                        required={field.isVisible}
                      />
                    )
                )}

                {/* Kit Collection */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2 flex items-center">
                    Kit Collection
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="kit_collection"
                    value={formData.kit_collection}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      validationErrors.kit_collection
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    required
                  >
                    <option value="">Select an Option</option>
                    <option value="with_tshirt">With T-Shirt</option>
                    <option value="without_tshirt">Without T-Shirt</option>
                  </select>
                  {validationErrors.kit_collection && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {validationErrors.kit_collection}
                    </p>
                  )}
                </div>

                {/* T-Shirt Size Dropdown */}
                {formData.kit_collection === "with_tshirt" && (
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2 flex items-center">
                      T-shirt Size
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="tshirt_size"
                      value={formData.tshirt_size}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        validationErrors.tshirt_size
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      required={formData.kit_collection === "with_tshirt"}
                    >
                      <option value="">Select Size</option>
                      <option value="S">Small (S)</option>
                      <option value="M">Medium (M)</option>
                      <option value="L">Large (L)</option>
                      <option value="XL">Extra Large (XL)</option>
                      <option value="XXL">2XL</option>
                      <option value="XXXL">3XL</option>
                      <option value="XXXXL">4XL</option>
                    </select>
                    {validationErrors.tshirt_size && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.tshirt_size}
                      </p>
                    )}
                  </div>
                )}

                {/* NID Upload */}
                {(eventsDetail?.data?.product_data?.is_cv_upload_field ===
                  "yes" ||
                  currentAge >= 50) && (
                  <div className="md:col-span-2">
                    <label className="text-gray-700 font-medium mb-2 flex items-center">
                      Upload NID/Passport
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="file"
                      name="cv"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.pdf"
                      className={`w-full border rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        validationErrors.cv
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      required={
                        eventsDetail?.data?.product_data?.is_cv_upload_field ===
                          "yes" || currentAge >= 50
                      }
                    />
                    <p className="text-gray-500 text-sm mt-1">
                      Accepted formats: JPG, PNG, PDF (Max size: 5MB)
                    </p>
                    {validationErrors.cv && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.cv}
                      </p>
                    )}
                  </div>
                )}

                {/* Delivery Location Field */}
                {formData.kit_collection === "with_tshirt" && (
                  <div className="md:col-span-2">
                    <label className="text-gray-700 font-medium mb-3 flex items-center">
                      Delivery Location
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="delivery_location"
                          value="inside_dhaka"
                          checked={
                            formData.delivery_location === "inside_dhaka"
                          }
                          onChange={handleChange}
                          className="mr-3 text-red-600"
                        />
                        <div>
                          <span className="font-medium text-gray-800">
                            Inside Dhaka
                          </span>
                          <p className="text-sm text-gray-600">
                            Delivery charge: 60 Tk
                          </p>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="delivery_location"
                          value="outside_dhaka"
                          checked={
                            formData.delivery_location === "outside_dhaka"
                          }
                          onChange={handleChange}
                          className="mr-3 text-red-600"
                        />
                        <div>
                          <span className="font-medium text-gray-800">
                            Outside Dhaka
                          </span>
                          <p className="text-sm text-gray-600">
                            Delivery charge: 120 Tk
                          </p>
                        </div>
                      </label>
                    </div>
                    {validationErrors.delivery_location && (
                      <p className="text-red-600 text-sm mt-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.delivery_location}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Registration...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Register & Pay ({totalPrice} Tk)
                  </>
                )}
              </button>

              {/* Terms and Privacy */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  By registering, you agree to our terms and conditions and
                  privacy policy. Your information will be used solely for event
                  management purposes.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Important Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Registration Confirmation
                </h4>
                <p className="text-sm text-gray-600">
                  You will receive a confirmation email after successful
                  payment.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Kit Delivery</h4>
                <p className="text-sm text-gray-600">
                  T-shirts will be delivered 3-5 days before the event.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Age Verification
                </h4>
                <p className="text-sm text-gray-600">
                  NID/Passport required for participants aged 50 and above.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Need help with registration?
            <a
              href="mailto:support@example.com"
              className="text-red-600 hover:text-red-700 font-medium ml-1"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
