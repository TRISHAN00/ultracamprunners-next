import axios from "axios";

export async function POST(req) {
  const data = await req.formData();
  const formObj = Object.fromEntries(data);

  console.log("✅ Payment Success:", formObj);

  const name = formObj.value_a;
  const email = formObj.value_b;
  const phone = formObj.value_c;
  const amount = formObj.amount;

  try {
    // ✅ Prepare FormData with just name, email, phone, and amount
    const formInputData = new FormData();
    formInputData.append("form_id", "event-form3");
    formInputData.append("name", name);
    formInputData.append("email", email);
    formInputData.append("phone", phone);
    formInputData.append("amount", amount);

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

  return Response.json({
    message: "✅ Payment succeeded",
    userData: { name, email, phone, amount },
    paymentData: formObj,
  });
}
