/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {

    const statusCode = err.statusCodes || 500;
    const message = err.message || "Something went wrong !";

    return res.status(statusCode).json({
        success : false,
        message,
        error: err,
    })
}
export default globalErrorHandler;