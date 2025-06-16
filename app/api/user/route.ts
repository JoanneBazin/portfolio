import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userData = await prisma.user.findFirst({
      select: {
        about: true,
        skills: true,
        projects: true,
      },
    });

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
