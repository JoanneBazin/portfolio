import { requireAdminAuth } from "@/lib/auth-helpers";
import { parseSkillFormData } from "@/lib/parseSkillFormData";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const { userId } = authResult;

  try {
    const formData = await request.formData();
    const parsedData = await parseSkillFormData(formData);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Erreur format des données" },
        { status: 400 }
      );
    }

    const newSkill = await prisma.skill.create({
      data: {
        ...parsedData.data,
        userId,
      },
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de la compétence" },
      { status: 500 }
    );
  }
}
