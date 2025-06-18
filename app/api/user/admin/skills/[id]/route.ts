import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json(
      { error: "Utilisateur non authentifié" },
      { status: 401 }
    );
  }

  const skillId = params.id;

  try {
    const deletedSkill = await prisma.skill.delete({
      where: {
        id: skillId,
      },
    });

    return NextResponse.json(
      { message: `${deletedSkill.name} supprimé !` },
      { status: 204 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
