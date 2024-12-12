import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";

// zod error Management
export const handelZodError = (error: ZodError) => {
    const errorSources: TErrorSource = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        }
    })
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    }
};