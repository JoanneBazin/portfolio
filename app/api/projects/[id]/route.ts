import { auth } from "@/lib/auth";
import { parseProjectFormData } from "@/lib/parseProjectFormData";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
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

  const projectId = params.id;

  try {
    const formData = await request.formData();
    const parsedData = await parseProjectFormData(formData);

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...parsedData,
        userId,
        images: {
          create: parsedData.images,
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json(
      { error: "Utilisateur non authentifié" },
      { status: 401 }
    );
  }

  const projectId = params.id;

  try {
    const updatedProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(
      { message: `${updatedProject.title} supprimé !` },
      { status: 204 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
