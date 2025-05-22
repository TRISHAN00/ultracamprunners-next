import { NextResponse } from "next/server";

export async function POST(req) {
  return NextResponse.redirect("https://ultracamprunners.com/fail", 303);
}
