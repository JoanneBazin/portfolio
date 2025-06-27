import { skillParsedSchema, validateWithSchema } from "./schemas";
import { ParsedSkillFormData } from "../app/types";
import { uploadImages } from "./uploadImages";

export const parseSkillFormData = async (
  formData: FormData
): Promise<
  { success: true; data: ParsedSkillFormData } | { success: false }
> => {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;

  const file = formData.get("logo") as File;
  const optimizedLogo = await uploadImages([file], name);
  const logo = optimizedLogo[0].url;

  const finalData = { name, category, logo };

  const finalValidation = validateWithSchema(skillParsedSchema, finalData);
  if (!finalValidation.success || !finalValidation.data) {
    return { success: false };
  }

  return {
    success: true,
    data: finalValidation.data,
  };
};
