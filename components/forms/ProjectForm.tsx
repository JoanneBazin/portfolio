"use client";

import { ProjectFormDataZ, projectSchema } from "@/lib/schemas";
import {
  ImagePreview,
  ProjectFormData,
  ProjectFormProps,
  ProjectImage,
} from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
  mode = "create",
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ProjectFormDataZ>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      images: initialData?.images || [],
      skills: initialData?.skills?.length
        ? initialData.skills.map((skill) => ({ value: skill }))
        : [{ value: "" }],
      objectives: initialData?.objectives?.length
        ? initialData.objectives.map((objective) => ({ value: objective }))
        : [{ value: "" }],
      githubUrl: initialData?.githubUrl || "",
      liveUrl: initialData?.liveUrl || "",
      size: initialData?.size || "small",
      order: initialData?.order || 1,
      imagesToDelete: [],
    },
    resolver: zodResolver(projectSchema),
  });

  // Dynamic arrays
  const {
    fields: objectiveFields,
    append: appendObjective,
    remove: removeObjective,
  } = useFieldArray({ control, name: "objectives" });
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });

  // Images updates
  const [imagesPreview, setImagesPreview] = useState<ImagePreview[]>([]);

  useEffect(() => {
    if (mode === "edit" && initialData?.images) {
      const existingPreviews: ImagePreview[] = initialData.images.map(
        (image: ProjectImage) => ({
          id: image.id,
          url: image.url,
          name: image.alt,
          isExisting: true,
          alt: image.alt,
          cover: image.cover,
        })
      );
      setImagesPreview(existingPreviews);
      setValue("images", initialData.images);
    }
  }, [initialData, mode, setValue]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      isExisting: false,
    }));

    setImagesPreview((prev) => [...prev, ...previews]);

    const currentImages = getValues("images") || [];
    setValue("images", [...currentImages, ...files]);
  };

  const removeImage = (index: number): void => {
    const preview = imagesPreview[index];
    const currentImages = getValues("images");

    if (preview.isExisting && preview.id) {
      const newImages = currentImages.filter((_, i) => i !== index);
      setValue("images", newImages);

      const imagesToDelete = getValues("imagesToDelete") || [];
      setValue("imagesToDelete", [...imagesToDelete, preview.id]);
    } else {
      const newImages = currentImages.filter((_, i) => i !== index);
      setValue("images", newImages);

      if (preview.file) {
        URL.revokeObjectURL(preview.url);
      }
    }

    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const onReset = () => {
    reset();
    imagesPreview.forEach((preview) => {
      if (!preview.isExisting) {
        URL.revokeObjectURL(preview.url);
      }
    });
    setImagesPreview([]);
  };

  // Form submit
  const onFormSubmit = (data: ProjectFormData): void => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.githubUrl) formData.append("githubUrl", data.githubUrl);
    if (data.liveUrl) formData.append("liveUrl", data.liveUrl);
    formData.append("size", data.size);
    formData.append("order", String(data.order));

    const newImages: File[] = [];
    const existingImages: ProjectImage[] = [];

    data.images.forEach((image) => {
      if (image instanceof File) {
        newImages.push(image);
      } else if (typeof image === "object" && "id" in image) {
        existingImages.push(image as ProjectImage);
      }
    });

    newImages.forEach((image) => {
      formData.append("newImages", image);
    });

    if (existingImages.length > 0) {
      formData.append(
        "existingImages",
        JSON.stringify(existingImages.map((img) => img.id))
      );
    }

    const imagesToDelete = getValues("imagesToDelete");
    if (imagesToDelete && imagesToDelete.length > 0) {
      formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
    }

    const validSkills = data.skills
      .map((obj) => obj.value.trim())
      .filter((val) => val !== "");
    formData.append("skills", JSON.stringify(validSkills));

    const validObjectives = data.objectives
      .map((obj) => obj.value.trim())
      .filter((val) => val !== "");
    formData.append("objectives", JSON.stringify(validObjectives));

    if (mode === "edit" && initialData?.id) {
      formData.append("id", initialData.id);
    }

    onSubmit({ formData, onReset });
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-8 max-w-4xl mx-auto p-4 sm:p-6"
    >
      <div>
        <label className="block text-sm sm:text-base font-medium mb-2">
          Titre du projet
        </label>
        <input
          type="text"
          {...register("title")}
          placeholder="Intégration frontend avec React"
        />
        {errors.title && (
          <p className="error-message">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm sm:text-base font-medium mb-2">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Description du projet..."
        />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm sm:text-base font-medium mb-2">
          Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImagesChange}
        />

        {imagesPreview.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {imagesPreview.map((preview, index) => (
              <div key={index} className="relative h-[200px]">
                <Image
                  src={preview.url}
                  alt={preview.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red rounded-full w-6 h-6 flex items-center justify-center pb-[1.5px] text-sm hover:bg-gray"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.images && (
          <p className="error-message">{errors.images.message}</p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm sm:text-base font-medium mb-3">
            Objectifs du projet
          </label>
          <button
            type="button"
            aria-label="Ajouter un objectif"
            onClick={() => appendObjective({ value: "" })}
            className="bg-accent text-background px-2 rounded text-lg hover:bg-gold mb-2"
          >
            +
          </button>
        </div>

        {objectiveFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              type="text"
              {...register(`objectives.${index}.value`, {
                required: "Texte requis",
              })}
              className="flex-1 mt-1"
              placeholder="Objectif du projet..."
            />

            {objectiveFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeObjective(index)}
                className="mt-2 ml-1 text-accent text-sm hover:text-red"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm sm:text-base font-medium mb-1">
            Compétences utilisées
          </label>
          <button
            type="button"
            onClick={() => appendSkill({ value: "" })}
            className="bg-accent text-background px-2 rounded text-lg hover:bg-gold mb-2"
          >
            +
          </button>
        </div>

        {skillFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              type="text"
              {...register(`skills.${index}.value`, {
                required: "Texte requis",
              })}
              className="flex-1 mt-1"
              placeholder="React, Node.js..."
            />

            {skillFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="mt-2 text-accent text-sm hover:text-red"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            URL Github
          </label>
          <input
            type="url"
            {...register("githubUrl")}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium mb-2">
            URL Live
          </label>
          <input
            type="url"
            {...register("liveUrl")}
            placeholder="https://projet.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm sm:text-base font-medium mb-2">
          Taille pour affichage
        </label>
        <select {...register("size")}>
          <option value="small">S</option>
          <option value="medium">M</option>
          <option value="large">L</option>
        </select>
      </div>

      <div>
        <label className="block text-sm sm:text-base font-medium mb-2">
          Ordre de priorité pour affichage
        </label>
        <select {...register("order")}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div>
        <button type="submit" className="form-btn" disabled={isLoading}>
          {isLoading
            ? "Chargement..."
            : mode === "edit"
            ? "Mettre à jour le projet"
            : "Créer le projet"}
        </button>
      </div>
    </form>
  );
};
