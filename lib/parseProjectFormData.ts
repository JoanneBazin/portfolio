import {
  ParsedProjectFormData,
  ParseProjectProps,
  UploadImageProps,
} from "./types";
import { uploadImages } from "./uploadImages";

export const parseProjectFormData = async ({
  formData,
  mode,
}: ParseProjectProps): Promise<ParsedProjectFormData> => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const size = (formData.get("size") as string) || "small";
  const order = parseInt(formData.get("order") as string, 10);
  const objectives = JSON.parse(
    formData.get("objectives") as string
  ) as string[];
  const skills = JSON.parse(formData.get("skills") as string) as string[];

  let images: UploadImageProps[] = [];
  let imagesToDelete: string[] = [];

  if (mode === "create") {
    const files = formData.getAll("newImages") as File[];
    if (files.length > 0) {
      images = await uploadImages(files, title);
    }
  } else {
    const newFiles = formData.getAll("newImages") as File[];
    if (newFiles.length > 0) {
      images = await uploadImages(newFiles, title);
    }

    const imagesToDeleteJson = formData.get("imagesToDelete") as string;

    imagesToDelete = imagesToDeleteJson
      ? (JSON.parse(imagesToDeleteJson) as string[])
      : [];
  }

  return {
    title,
    description,
    githubUrl,
    liveUrl,
    size,
    order,
    objectives,
    skills,
    images,
    imagesToDelete,
  };
};
