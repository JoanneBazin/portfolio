import { requireAdminAuth } from "@/lib/auth-helpers";
import { deleteImage } from "@/lib/deleteImage";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { id: skillId } = await params;

  try {
    const skillToDeleteFromDB = await prisma.skill.findUnique({
      where: {
        id: skillId,
      },
      select: { logo: true },
    });

    const deletedSkill = await prisma.skill.delete({
      where: {
        id: skillId,
      },
    });

    const urlToDelete = skillToDeleteFromDB?.logo;
    if (urlToDelete) {
      await deleteImage(urlToDelete);
    }

    return NextResponse.json(
      { message: "Compétence supprimé !" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la compétence" },
      { status: 500 }
    );
  }
}
