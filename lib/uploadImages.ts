import { UploadImageProps } from "../types";
import sharp from "sharp";
import supabaseServer from "./supabaseServer";

export const uploadImages = async (
  files: File[],
  alt: string
): Promise<UploadImageProps[]> => {
  const bucket = "project-images";

  const images = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      const filename =
        file.name.split(" ").join("_").split(".")[0] + Date.now() + ".webp";

      const optimizedImage = await sharp(buffer)
        .resize({ width: 1280 })
        .webp({ quality: 80 })
        .toBuffer();

      const { error } = await supabaseServer.storage
        .from(bucket)
        .upload(filename, optimizedImage, {
          contentType: "image/webp",
          upsert: true,
        });

      if (error) {
        throw new Error(`Erreur lors de l'upload: ${error.message}`);
      }

      return {
        url: `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${filename}`,
        alt: `${alt}`,
      };
    })
  );
  return images;
};
