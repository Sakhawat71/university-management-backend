import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterMonths, AcademicSemesterName } from "./academicSemester.constant";


const createAcademicSemesterValidation = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]]),
        endMonth: z.enum([...AcademicSemesterMonths as [string, ...string[]]]),
    })
});
const updateAcademicSemesterValidation = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]]).optional(),
        endMonth: z.enum([...AcademicSemesterMonths as [string, ...string[]]]).optional(),
    })
});


export const AcademicSemesterValidation = {
    createAcademicSemesterValidation,
    updateAcademicSemesterValidation,
}