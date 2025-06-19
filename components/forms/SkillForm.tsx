"use client";

import { SkillFormDataZ, skillSchema } from "@/lib/schemas";
import { ImagePreview, ProjectFormProps, SkillFormData } from "@/lib/types";
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
          className="w-full p-3 border border-dark-gray rounded-lg focus:ring-2 focus:ring-gold-dark focus:border-transparent"
          placeholder="React, Node.js..."
        />
        {errors.name && (
          <p className="text-red-900 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Catégorie</label>
        <select
          {...register("category")}
          className="w-full p-3 border border-dark-gray rounded-lg focus:ring-2 focus:ring-gold-dark focus:border-transparent"
        >
          <option value="">Sélectionner...</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="database">Base de données</option>
          <option value="tools">Outils</option>
          <option value="design">Design</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-dark-gray rounded-lg focus:ring-2 focus:ring-gold-dark focus:border-transparent"
        />

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
                className="bg-red-900 rounded-full w-4 h-4 flex items-center justify-center text-sm hover:bg-red-800"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gold-light py-3 px-6 rounded-lg font-medium hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
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
