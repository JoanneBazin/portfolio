import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userData = await prisma.user.findFirst({
      select: {
        about: true,
        skills: true,
        projects: {
          include: {
            images: true,
          },
        },
      },
    });

    return NextResponse.json(userData, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" },
      { status: 500 }
    );
  }
}
