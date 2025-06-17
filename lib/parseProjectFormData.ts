import { ParsedProjectFormData } from "./types";
import { uploadImages } from "./uploadImages";

export const parseProjectFormData = async (
  formData: FormData
): Promise<ParsedProjectFormData> => {
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

  const files = formData.getAll("images") as File[];
  const images = await uploadImages(files, title);

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
  };
};
