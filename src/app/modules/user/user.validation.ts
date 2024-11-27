import { z } from "zod";

export const userValidateSchema = z.object({
    id: z.string().min(1, "ID is required"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must not exceed 20 characters"),
    needsPasswordChange: z.boolean().default(true).optional(),
    role: z.enum(
        ["admin", "student", "faculty"],
        { message: "Role must be one of: admin, student, faculty" }
    ),
    status: z.enum(
        ["in-progress", "blocked"],
        { message: "Status must be one of: in-progress, blocked" }
    ).default('in-progress'),
    isDeleted: z.boolean().default(false),
});
