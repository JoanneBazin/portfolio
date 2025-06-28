import { requireAdminAuth } from "@/lib/auth-helpers";
import { deleteImage } from "@/lib/deleteImage";
import { parseProjectFormData } from "@/lib/parseProjectFormData";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const { userId } = authResult;

  const { id: projectId } = await params;

  try {
    const formData = await request.formData();
    const parsedData = await parseProjectFormData({ formData, mode: "edit" });

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Erreur format des données" },
        { status: 400 }
      );
    }

    const { images, imagesToDelete, ...projectData } = parsedData.data;

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log("Erreur lors de la suppression des images");
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur dans la mise à jour du projet" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) {
    return authResult;
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

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    const urlToDelete = projectToDeleteFromDB?.images.map((img) => img.url);
    if (urlToDelete && urlToDelete?.length > 0) {
      await Promise.all(urlToDelete?.map(async (url) => deleteImage(url)));
    }

    return NextResponse.json({ message: `Projet supprimé !` }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression du projet" },
      { status: 500 }
    );
  }
}
