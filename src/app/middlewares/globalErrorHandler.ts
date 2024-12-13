/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import { handelZodError } from "../errors/handelZodError";
import handelValidationError from "../errors/handelValidationError";
import handelCastErrro from "../errors/handelCastError";

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

    // instance of -> All kind of error
    if (err instanceof ZodError) {
        const simplifiedError = handelZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === "ValidationError") {
        const simplifiedError = handelValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }else if(err?.name === 'CastError'){
        const simplifiedError = handelCastErrro(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }

    // Ultimate return
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
        // mainError: err,
    })
}
export default globalErrorHandler;