import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received Request:", body); // Debugging

    // Destructure data from the request
    const { name, phone, address, city, amount, eventprice, kilometer } = body;

    // Ensure required fields are present
    if (!name || !phone || !address || !city || !amount  || !kilometer) {
      return NextResponse.json({
        status: "FAILED",
        message: "All fields are required.",
      });
    }

    const tran_id = Math.floor(100000 + Math.random() * 900000).toString();
    const init_url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    const formData = new FormData();
    formData.append("store_id", process.env.SSLCOMMERZ_STORE_ID);
    formData.append("store_passwd", process.env.SSLCOMMERZ_STORE_PASSWORD);    
    formData.append("kilometer", kilometer);
    formData.append("total_amount", parseFloat(amount));
    formData.append("currency", "BDT");
    formData.append("tran_id", tran_id);
    formData.append("success_url", `${process.env.NEXT_PUBLIC_BASE_URL}/api/success?id=${tran_id}`);
    formData.append("fail_url", `${process.env.NEXT_PUBLIC_BASE_URL}/api/fail?id=${tran_id}`);
    formData.append("cancel_url", `${process.env.NEXT_PUBLIC_BASE_URL}/api/cancel?id=${tran_id}`);
    formData.append("ipn_url", `${process.env.NEXT_PUBLIC_BASE_URL}/api/ipn?id=${tran_id}`);

    // Customer Info (Ensure `email` is always present)
    formData.append("cus_name", name);
    formData.append("cus_email", body.email || "test@example.com"); // Default email if not provided
    formData.append("cus_add1", address);
    formData.append("cus_city", city);
    formData.append("cus_country", "Bangladesh");
    formData.append("cus_phone", phone);

    // Shipping Info
    formData.append("shipping_method", "YES");
    formData.append("ship_name", name);
    formData.append("ship_add1", address);
    formData.append("ship_city", city);
    formData.append("ship_country", "Bangladesh");
    formData.append("ship_postcode", "3600");

    // Product Info
    formData.append("product_name", "E-commerce Items");
    formData.append("product_category", "General");
    formData.append("product_profile", "general");

    const requestOptions = { method: "POST", body: formData };
    let SSLRes = await fetch(init_url, requestOptions);
    let SSLResJSON = await SSLRes.json();

    console.log("SSLCommerz Response:", SSLResJSON); // Debugging

    if (SSLResJSON.GatewayPageURL) {
      return NextResponse.json({ url: SSLResJSON.GatewayPageURL });
    } else {
      return NextResponse.json({
        status: "FAILED",
        message: "Payment initiation failed",
        error: SSLResJSON,
      });
    }
  } catch (e) {
    console.error("Payment API Error:", e);
    return NextResponse.json({
      status: "FAILED",
      message: "Internal Server Error",
      error: e.message,
    });
  }
}
