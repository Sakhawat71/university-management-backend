import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

// zod error Management
export const handelZodError = (error: ZodError) : TGenericErrorResponse => {
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