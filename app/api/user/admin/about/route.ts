import { requireAdminAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const { userId } = authResult;

  try {
    const body = await request.json();
    const about = body.about;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        about: about,
      },
    });

    return NextResponse.json(updatedUser.about, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la publication" },
      { status: 500 }
    );
  }
}
