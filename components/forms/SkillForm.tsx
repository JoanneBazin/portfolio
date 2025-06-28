"use client";

import { SkillFormDataZ, skillSchema } from "@/lib/schemas";
import { ImagePreview, ProjectFormProps, SkillFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const SkillForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  isLoading = false,
  mode = "create",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<SkillFormDataZ>({
    defaultValues: {
      name: "",
      category: undefined,
      logo: "",
    },
    resolver: zodResolver(skillSchema),
  });

  const [imagePreview, setImagePreview] = useState<ImagePreview | null>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = {
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    };

    setImagePreview(preview);
    setValue("logo", file);
  };

  const removeImage = (): void => {
    if (imagePreview?.url) {
      URL.revokeObjectURL(imagePreview?.url);
    }

    setValue("logo", "");
    setImagePreview(null);
  };

  const onReset = () => {
    reset();
    setImagePreview(null);
  };

  // Form submit
  const onFormSubmit = (data: SkillFormData): void => {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.category) formData.append("category", data.category);
    formData.append("logo", data.logo);

    onSubmit({ formData, onReset });
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6 max-w-4xl mx-auto p-6"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Nom</label>
        <input
          type="text"
          {...register("name")}
          placeholder="React, Node.js..."
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Catégorie</label>
        <select {...register("category")}>
          <option value="">Sélectionner...</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="database">Base de données</option>
          <option value="tools">Outils</option>
          <option value="design">Design</option>
        </select>
        {errors.category && (
          <p className="error-message">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Logo</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {imagePreview && (
          <div className="mt-4">
            <div className="flex gap-4 items-center">
              <Image
                src={imagePreview.url}
                alt={imagePreview.name}
                width={50}
                height={50}
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="mt-2 text-accent hover:text-red"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <button type="submit" disabled={isLoading} className="form-btn">
          {isLoading
            ? "Création en cours..."
            : mode === "edit"
            ? "Mettre à jour"
            : "Créer"}
        </button>
      </div>
    </form>
  );
};
