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
import EventForm from "../../../components/event/EventForm";

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

  // Handle form submission and payment
  const handleFormSubmitAndPayment = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: 'mohakhali',
          city: 'dhaka',
          amount: totalPrice,
          kilometer: km,
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
            <EventForm/>
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
