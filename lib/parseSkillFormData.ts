import { ParsedSkillFormData } from "./types";
import { uploadImages } from "./uploadImages";

export const parseSkillFormData = async (
  formData: FormData
): Promise<ParsedSkillFormData> => {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;

  const file = formData.get("logo") as File;
  const optimizedLogo = await uploadImages([file], name);
  const logo = optimizedLogo[0].url;

  return {
    name,
    category,
    logo,
  };
};
