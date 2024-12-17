import { z } from "zod";

// Zod schema for pre-requisite course
const preRequisiteCourseSchemaValidation = z.object({
    course: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // MongoDB ObjectId
    isDeleted: z.boolean().optional(),
});

// Zod schema for creating a course
export const createCourseSchemaValidation = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").trim(),
        prefix: z.string().min(1, "Prefix is required").trim(),
        code: z.number().int().min(1, "Code must be a positive integer"),
        credits: z.number().min(1, "Credits must be a positive number"),
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(preRequisiteCourseSchemaValidation).optional(),
    })
});

// Zod schema for updating a course
export const updateCourseSchemaValidation = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").trim().optional(),
        prefix: z.string().min(1, "Prefix is required").trim().optional(),
        code: z.number().int().min(1, "Code must be a positive integer").optional(),
        credits: z.number().min(1, "Credits must be a positive number").optional(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(preRequisiteCourseSchemaValidation).optional(),
    })

});

export const courseValidation = {
    createCourseSchemaValidation,
    updateCourseSchemaValidation
}