import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.conostant";

const createSemesterRegistrationSchemaValidation = z.object({
    body: z.object({
        academicSemester: z
            .string({ required_error: "Academic semester is required." }),
        status: z
            .enum(
                [...SemesterRegistrationStatus as [string, ...string[]]],
                { required_error: "Status is required." }
            )
            .default("UPCOMING"),
        startDate: z
            .string({ required_error: "Start date is required." })
        // .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." })
        ,
        endDate: z
            .string({ required_error: "End date is required." })
        // .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." })
        ,
        minCredit: z
            .number()
            .min(1, { message: "Minimum credit must be at least 1." })
            .default(3),
        maxCredit: z
            .number()
            .min(1, { message: "Maximum credit must be at least 1." })
            .default(16),
    })
});



const updateSemesterRegistrationSchemaValidation = z.object({
    body: z.object({
        academicSemester: z
            .string()
            .optional(),
        status: z
            .enum([...SemesterRegistrationStatus as [string, ...string[]]])
            .optional(),
        startDate: z
            .string()
            .optional(),
        endDate: z
            .string()
            .optional(),
        minCredit: z
            .number()
            .min(1, { message: "Minimum credit must be at least 1." })
            .optional(),
        maxCredit: z
            .number()
            .min(1, { message: "Maximum credit must be at least 1." })
            .optional(),
    })

});


export const SemesterRegistrationValidation = {
    createSemesterRegistrationSchemaValidation,
    updateSemesterRegistrationSchemaValidation,
}