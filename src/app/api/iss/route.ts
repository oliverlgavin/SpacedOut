import { NextResponse } from "next/server";
import { getISSPosition } from "@/lib/api/iss-tracker";

export const revalidate = 30;

export async function GET() {
  try {
    const position = await getISSPosition();
    return NextResponse.json(position);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch ISS position" },
      { status: 502 }
    );
  }
}
