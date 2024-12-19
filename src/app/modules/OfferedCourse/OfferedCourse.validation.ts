import { z } from "zod";
import { Days } from "./OfferedCourse.constants";


const timeStringSchema = z.string().refine(
    (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
        return regex.test(time);
    },
    {
        message: 'Invalid time format , expected "HH:MM" in 24 hours format',
    },
);

const createOfferedCourseValidation = z.object({

    body: z.object({
        semesterRegistration: z.string({
            required_error: "Semester registration is required",
            invalid_type_error: "Semester registration must be a string",
        }),

        academicSemester: z.string({
            invalid_type_error: "Academic semester must be a string",
        }).optional(),

        academicFaculty: z.string({
            required_error: "Academic faculty is required",
            invalid_type_error: "Academic faculty must be a string",
        }),

        academicDepartment: z.string({
            required_error: "Academic department is required",
            invalid_type_error: "Academic department must be a string",
        }),

        course: z.string({
            required_error: "Course is required",
            invalid_type_error: "Course must be a string",
        }),

        faculty: z.string({
            required_error: "Faculty is required",
            invalid_type_error: "Faculty must be a string",
        }),

        maxCapacity: z.number({
            required_error: "Max capacity is required",
            invalid_type_error: "Max capacity must be a number",
        }).min(1, "Max capacity must be at least 1"),

        section: z.number({
            required_error: "Section is required",
            invalid_type_error: "Section must be a number",
        }).min(1, "Section must be at least 1"),

        days: z.array(z.enum([...Days] as [string, ...string[]])),

        startTime: z.string({
            required_error: "Start time is required",
            invalid_type_error: "Start time must be a string",
        }).regex(/^\d{2}:\d{2}$/, "Start time must be in HH:MM format"),

        endTime: z.string({
            required_error: "End time is required",
            invalid_type_error: "End time must be a string",
        }).regex(/^\d{2}:\d{2}$/, "End time must be in HH:MM format"),
    })
        .refine(
            (body) => {
                // startTime : 10:30  => 1970-01-01T10:30
                //endTime : 12:30  =>  1970-01-01T12:30

                const start = new Date(`1970-01-01T${body.startTime}:00`);
                const end = new Date(`1970-01-01T${body.endTime}:00`);

                return end > start;
            },
            {
                message: 'Start time should be before End time !  ',
            },
        ),
});


const updateOfferedCourseValidation = z.object({
    body: z.object({
        faculty: z.string(),
        maxCapacity: z.number(),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        startTime: timeStringSchema, // HH: MM   00-23: 00-59
        endTime: timeStringSchema,
    }).refine(
        (body) => {
            // startTime : 10:30  => 1970-01-01T10:30
            //endTime : 12:30  =>  1970-01-01T12:30

            const start = new Date(`1970-01-01T${body.startTime}:00`);
            const end = new Date(`1970-01-01T${body.endTime}:00`);

            return end > start;
        },
        {
            message: 'Start time should be before End time !  ',
        },
    ),
});


export const offeredCourseValidation = {
    createOfferedCourseValidation,
    updateOfferedCourseValidation
};
