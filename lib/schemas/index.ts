import { z } from "zod";

export * from "./auth";
export * from "./contact";
export * from "./portfolio";

export const validateWithSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.reduce((acc, error) => {
      const path = error.path.join(".");
      acc[path] = error.message;
      return acc;
    }, {} as Record<string, string>);

    return {
      success: false,
      errors,
      data: null,
    };
  }

  return {
    success: true,
    errors: null,
    data: result.data,
  };
};
