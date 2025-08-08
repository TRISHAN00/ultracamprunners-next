import axios from "axios";
import qs from "qs"; // Install this if not present
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      amount,
      full_address,
      country,
      city,
      thana,
      date_of_birth,
      t_shirt_size,
      km,
      gender,
      file,
      emc,
      nid
    } = body;

    const transactionId = uuidv4();

    const payload = {
      store_id: process.env.SSLCOMMERZ_STORE_ID,
      store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
      total_amount: amount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cancel`,
      cus_name: name,
      cus_email: email,
      cus_phone: phone,
      cus_add1: full_address || "N/A",
      cus_add2: thana || "N/A",

      cus_city: city || "N/A",
      cus_state: city || "N/A",

      cus_country: country || "Bangladesh",

      shipping_method: "NO",
      product_name: "Demo Product",
      product_category: "Demo",
      product_profile: "general",

      value_a: `${name}|${email}|${phone}`,
      value_b: `${full_address}|${city}|${thana}|${country}`,
      value_c: `${date_of_birth}|${t_shirt_size}|${km}|${gender}|${file}|${emc}|${nid}`,
    };

    const response = await axios.post(
      "https://securepay.sslcommerz.com/gwprocess/v4/api.php",
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
