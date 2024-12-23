import { z } from "zod";

export const userValidateSchema = z.object({
    password: z
        .string({ invalid_type_error: "Password must be string" })
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must not exceed 20 characters")
        .optional()
});
