import path from "path";
import { UploadImageProps } from "./types";
import { promises } from "fs";
import sharp from "sharp";

export const uploadImages = async (
  files: File[],
  alt: string
): Promise<UploadImageProps[]> => {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await promises.mkdir(uploadDir, { recursive: true });

  const images = await Promise.all(
    files.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename =
        file.name.split(" ").join("_").split(".")[0] + Date.now() + ".webp";
      const filepath = path.join(uploadDir, filename);

      await sharp(buffer)
        .resize({ width: 1400 })
        .webp({ quality: 80 })
        .toFile(filepath);

      return {
        url: `/uploads/${filename}`,
        alt: `Image du site du projet ${alt} ${index + 1}`,
      };
    })
  );
  return images;
};
