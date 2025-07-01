import { z } from "zod";

export const projectImageSchema = z.object({
  id: z.string(),
  url: z.string().url("Format d'image invalide ou chemin incorrect"),
  cover: z.boolean(),
  projectId: z.string(),

  alt: z.string(),
});
export const uploadImageSchema = z.object({
  url: z.string().url("Format d'image invalide ou chemin incorrect"),
  alt: z.string(),
});

export const projectSchema = z.object({
  title: z
    .string()
    .min(2, "Le titre doit contenir au moins 2 caractères")
    .max(150, "Le titre ne peut pas dépasser 150 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(500, "La description ne peut pas dépasser 500 caractères"),
  images: z
    .array(
      z.union([
        z.instanceof(File, { message: "Fichier image invalide" }),
        projectImageSchema,
      ])
    )
    .min(1, "Au moins une image est requise")
    .max(10, "Max 10 images"),
  skills: z
    .array(
      z.object({
        value: z
          .string()
          .min(2, "Le nom doit contenir au moins 2 caractères")
          .max(20, "Le nom ne peut pas dépasser 20 caractères"),
      })
    )
    .min(1, "Au moins une techno est requise")
    .max(10, "Max 10 technos"),
  objectives: z
    .array(
      z.object({
        value: z
          .string()
          .min(6, "L'objectif' doit contenir au moins 6 caractères")
          .max(500, "L'objectif ne peut pas dépasser 500 caractères"),
      })
    )
    .min(1, "Au moins un objectif est requise")
    .max(10, "Max 10 objectifs"),
  githubUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  liveUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  size: z.enum(["small", "medium", "large"]),
  order: z.coerce.number().int("Doit être un entier"),

  imagesToDelete: z.array(z.string()).optional(),
});
export const projectParsedSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(2, "Le titre doit contenir au moins 2 caractères")
    .max(150, "Le titre ne peut pas dépasser 150 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(500, "La description ne peut pas dépasser 500 caractères"),
  images: z.array(uploadImageSchema),
  skills: z
    .array(
      z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(20, "Le nom ne peut pas dépasser 20 caractères")
    )
    .min(1, "Au moins une techno est requise")
    .max(10, "Max 10 technos"),
  objectives: z
    .array(
      z
        .string()
        .min(6, "L'objectif' doit contenir au moins 6 caractères")
        .max(500, "L'objectif ne peut pas dépasser 500 caractères")
    )
    .min(1, "Au moins un objectif est requise")
    .max(10, "Max 10 objectifs"),
  githubUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  liveUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  size: z.enum(["small", "medium", "large"]),
  order: z.number().int("Doit être un entier"),

  imagesToDelete: z.array(z.string()).optional(),
});

export const skillSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(20, "Le nom ne peut contenir plus de 20 caractères"),
  category: z.enum(["frontend", "backend", "database", "tools", "design"]),

  logo: z.union([
    z.instanceof(File, { message: "Fichier invalide" }),
    z.string(),
  ]),
});
export const skillParsedSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(20, "Le nom ne peut contenir plus de 20 caractères"),
  category: z.enum(["frontend", "backend", "database", "tools", "design"]),

  logo: z.string(),
});

export const aboutSchema = z.object({
  about: z
    .string()
    .min(10, "La présentation doit contenir au moins 10 caractères")
    .max(1000, "La présentation ne peut contenir plus de 1000 caractères"),
});

export type ProjectFormDataZ = z.infer<typeof projectSchema>;
export type SkillFormDataZ = z.infer<typeof skillSchema>;
export type AboutFormData = z.infer<typeof aboutSchema>;
export type ProjectImage = z.infer<typeof projectImageSchema>;
