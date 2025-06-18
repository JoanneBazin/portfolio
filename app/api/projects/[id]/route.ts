import { auth } from "@/lib/auth";
import { deleteImage } from "@/lib/deleteImage";
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

  const { id: projectId } = await params;

  try {
    const formData = await request.formData();
    const parsedData = await parseProjectFormData({ formData, mode: "edit" });

    const { images, imagesToDelete, ...projectData } = parsedData;

    if (imagesToDelete && imagesToDelete.length > 0) {
      try {
        const imagesToDeleteFromDB = await prisma.projectImage.findMany({
          where: {
            id: { in: imagesToDelete },
          },
          select: { url: true },
        });

        if (imagesToDeleteFromDB.length > 0) {
          const deletedCount = await prisma.projectImage.deleteMany({
            where: {
              id: {
                in: imagesToDelete,
              },
            },
          });

          console.log(`${deletedCount} images supprimées de la DB`);

          const urlToDelete = imagesToDeleteFromDB.map((img) => img.url);
          await Promise.all(urlToDelete.map(async (url) => deleteImage(url)));
        }
      } catch (error) {
        console.log("Erreur lors de la suppression des images: ", error);
      }
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
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

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}

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

  const { id: projectId } = await params;

  try {
    const projectToDeleteFromDB = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        images: {
          select: { url: true },
        },
      },
    });

    const urlToDelete = projectToDeleteFromDB?.images.map((img) => img.url);
    if (urlToDelete && urlToDelete?.length > 0) {
      await Promise.all(urlToDelete?.map(async (url) => deleteImage(url)));
    }

    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json({ message: `Projet supprimé !` }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
