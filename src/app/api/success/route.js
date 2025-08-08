import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const formObj = Object.fromEntries(data);

  const personalData = formObj.value_a ? formObj.value_a.split("|") : [];
  const addressData = formObj.value_b ? formObj.value_b.split("|") : [];
  const infoData = formObj.value_c ? formObj.value_c.split("|") : [];

  const [name, email, phone] = personalData;
  const [full_address, city, thana, country] = addressData;
  const [date_of_birth, t_shirt_size, km, gender, file, emc, nid] = infoData;

  const amount = formObj.amount;

  try {
    // ✅ Prepare FormData with just name, email, phone, and amount
    const formInputData = new FormData();
    formInputData.append("form_id", "event-form3");
    formInputData.append("name", name);
    formInputData.append("email", email);
    formInputData.append("phone", phone);
    formInputData.append("amount", amount);
    formInputData.append("full_address", full_address);
    formInputData.append("city", city);
    formInputData.append("thana", thana);
    formInputData.append("country", country);
    formInputData.append("emc", emc);
    formInputData.append("nid", nid);

    formInputData.append("date_of_birth", date_of_birth);
    formInputData.append("t_shirt_size", t_shirt_size);
    formInputData.append("km", km);
    formInputData.append("gender", gender);
    formInputData.append("file", file);

    const api_services = `${process.env.NEXT_PUBLIC_API_BASE_URL}/post-req-data/form-submit`;

    await axios.post(api_services, formInputData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Sent data to form-submit API");
  } catch (err) {
    console.error("❌ Failed to submit form:", err.message);
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    302
  );
}
