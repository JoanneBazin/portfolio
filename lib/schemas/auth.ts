import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Adresse email invalide"),

  password: z
    .string()
    .min(8, "Le nom doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre"
    ),
});

export type AuthFormData = z.infer<typeof authSchema>;
