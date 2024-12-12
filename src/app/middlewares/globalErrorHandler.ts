/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next): Promise<any> => {
    //setting default values
    let statusCode = err.statusCodes || 500;
    let message = err.message || "Something went wrong !";
    let errorSources: TErrorSource = [
        {
            path: '',
            message: 'Something went wrong'
        },
    ];


    // zod error Management
    const handelZodError = (error : ZodError) => {
        const errorSources : TErrorSource = error.issues.map((issue: ZodIssue) => {
            return {
                path : issue?.path[issue.path.length-1],
                message : issue.message,
            }
        })
        const statusCode = 400;
        return {
            statusCode,
            message: 'zod validation error',
            errorSources,
        }
    };

    // instance of -> All kind of error
    if (err instanceof ZodError) {
        const simplifiedError = handelZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    // Ultimate return
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: err,
    })
}
export default globalErrorHandler;