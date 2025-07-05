import axios from "axios";
import qs from "qs"; // Install this if not present
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, amount } = body;

    const transactionId = uuidv4();

    const payload = {
      store_id: "teamr64c9e84055219",
      store_passwd: "teamr64c9e84055219@ssl",
      total_amount: amount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/cancel`,
      cus_name: name,
      cus_email: email,
      cus_phone: phone,
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      shipping_method: "NO",
      product_name: "Demo Product",
      product_category: "Demo",
      product_profile: "general",

      // ✅ Add custom fields to carry forward
      value_a: name,
      value_b: email,
      value_c: phone,
    };

    const response = await axios.post(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      qs.stringify(payload), // convert to urlencoded format
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const redirectUrl = response.data?.GatewayPageURL;

    if (!redirectUrl) {
      return Response.json(
        {
          error: "Gateway URL not returned",
          sslcommerz_response: response.data,
        },
        { status: 500 }
      );
    }

    return Response.json({ redirectUrl });
  } catch (error) {
    console.error(
      "🔥 SSLCommerz Error:",
      error?.response?.data || error.message
    );
    return Response.json(
      { error: error?.response?.data || error.message },
      { status: 500 }
    );
  }
}
