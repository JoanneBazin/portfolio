import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json(
      { error: "Utilisateur non authentifié" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const skill = body.skill;

    const newSkill = await prisma.skill.create({
      data: {
        ...skill,
        userId,
      },
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json(
      { error: "Utilisateur non authentifié" },
      { status: 401 }
    );
  }

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
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
