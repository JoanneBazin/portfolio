import { requireAdminAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { aboutSchema, validateWithSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const { userId } = authResult;

  const body = await request.json();

  const validation = validateWithSchema(aboutSchema, body);
  if (!validation.success || !validation.data) {
    return NextResponse.json(
      {
        error: "Erreur données lors de l'envoi de la requête",
      },
      { status: 400 }
    );
  }

  const { about } = validation.data;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        about: about,
      },
    });

    return NextResponse.json(updatedUser.about, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la publication" },
      { status: 500 }
    );
  }
}
