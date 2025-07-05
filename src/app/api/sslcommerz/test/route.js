// app/api/sslcommerz/test/route.js
export async function POST(req) {
  const body = await req.json();
  console.log("📦 Test POST data:", body);
  return Response.json({ received: body });
}
