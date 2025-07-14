import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File;
    const linkedin = formData.get("linkedin");
    const instagram = formData.get("instagram");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
