import { auth } from "@/lib/auth";
import { deleteImage } from "@/lib/deleteImage";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json(
      { error: "Utilisateur non authentifié" },
      { status: 401 }
    );
  }

  const { id: skillId } = await params;

  try {
    const skillToDeleteFromDB = await prisma.skill.findUnique({
      where: {
        id: skillId,
      },
      select: { logo: true },
    });

    const urlToDelete = skillToDeleteFromDB?.logo;
    if (urlToDelete) {
      await deleteImage(urlToDelete);
    }

    const deletedSkill = await prisma.skill.delete({
      where: {
        id: skillId,
      },
    });

    return NextResponse.json(
      { message: "Compétence supprimé !" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
