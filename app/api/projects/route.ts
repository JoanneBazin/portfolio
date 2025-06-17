import { auth } from "@/lib/auth";
import { parseProjectFormData } from "@/lib/parseProjectFormData";
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
    const formData = await request.formData();
    const parsedData = await parseProjectFormData(formData);

    const newProject = await prisma.project.create({
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

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
