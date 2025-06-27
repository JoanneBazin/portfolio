import { projectParsedSchema, validateWithSchema } from "./schemas";
import {
  ParsedProjectFormData,
  ParseProjectProps,
  UploadImageProps,
} from "../app/types";
import { uploadImages } from "./uploadImages";

export const parseProjectFormData = async ({
  formData,
  mode,
}: ParseProjectProps): Promise<
  { success: true; data: ParsedProjectFormData } | { success: false }
> => {
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

  const finalData = {
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

  if (finalData.githubUrl === null) finalData.githubUrl = "";
  if (finalData.liveUrl === null) finalData.liveUrl = "";

  const finalValidation = validateWithSchema(projectParsedSchema, finalData);
  if (!finalValidation.success || !finalValidation.data) {
    console.log(finalValidation.errors);

    return { success: false };
  }

  return {
    success: true,
    data: finalValidation.data,
  };
};
