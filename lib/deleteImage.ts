import { unlink } from "fs";
import path from "path";

export const deleteImage = async (url: string): Promise<void> => {
  try {
    const fullPath = path.join(process.cwd(), "public", url);
    await unlink(fullPath, () => {
      console.log("Fichier supprimé: ", url);
    });
  } catch (error) {
    console.log("Erreur suppression: ", error);
  }
};
