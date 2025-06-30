import supabaseServer from "./supabaseServer";

export const deleteImage = async (url: string): Promise<void> => {
  try {
    const bucketName = "project-images";
    const urlPath = url.split(`/storage/v1/object/public/${bucketName}/`);
    const filePath = urlPath.length > 1 ? urlPath[1] : null;

    if (!filePath) {
      throw new Error("Le chemin du fichier est invalide.");
    }

    const { error } = await supabaseServer.storage
      .from(bucketName)
      .remove([filePath]);
    if (error) {
      throw error;
    }

    console.log("Fichier supprimé de Supabase");
  } catch (error) {
    console.log("Erreur suppression: ", error);
  }
};
