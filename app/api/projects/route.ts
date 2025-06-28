import { requireAdminAuth } from "@/lib/auth-helpers";
import { parseProjectFormData } from "@/lib/parseProjectFormData";
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
    const parsedData = await parseProjectFormData({ formData, mode: "create" });

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Erreur format des données" },
        { status: 400 }
      );
    }

    const {
      images,
      imagesToDelete, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...projectData
    } = parsedData.data;

    const newProject = await prisma.project.create({
      data: {
        ...projectData,
        userId,
        images: {
          create: images,
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du projet" },
      { status: 500 }
    );
  }
}
