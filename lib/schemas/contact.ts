import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-Zà-ÿÀ-Ÿ\s-']+$/, "Le nom contient des caractères invalides"),
  email: z.string().email("Adresse email invalide").max(100, "Email trop long"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "le message ne peut pas dépasser 1000 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
