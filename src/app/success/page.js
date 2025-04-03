"use client";
import { useEffect } from "react";
export default function SuccessPage() {
  useEffect(() => {
    const submitFormAfterPayment = async () => {
      const storedFormData = JSON.parse(localStorage.getItem("formData"));
      if (!storedFormData) return;

      let api_services = "https://zoraithost.com/cms/api/post-req-data/form-submit";
      let formInputData = new FormData();
      Object.keys(storedFormData).forEach((key) => {
        formInputData.append(key, storedFormData[key]);
      });

      await fetch(api_services, { method: "POST", body: formInputData });

      localStorage.removeItem("formData"); // Clear stored data
    };

    submitFormAfterPayment();
  }, []);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
          <p className="mt-4 text-gray-700">Thank you for your payment! Your transaction was successful.</p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
  