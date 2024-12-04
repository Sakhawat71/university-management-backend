import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterMonths, AcademicSemesterName } from "./academicSemester.constant";


const createAcademicSemesterValidation = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
        year: z.date(),
        startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]]),
        endMonth: z.enum([...AcademicSemesterMonths as [string, ...string[]]]),
    })
});


export const AcademicSemesterValidation = {
    createAcademicSemesterValidation,
}