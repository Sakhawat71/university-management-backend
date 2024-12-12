/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler} from "express";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next): Promise<any> => {

    let statusCode = err.statusCodes || 500;
    let message = err.message || "Something went wrong !";

    type TErrorSource = {
        path: string | number;
        message: string;
    }[];

    const errorSources : TErrorSource = [
        {
            path : '',
            message: 'Something went wrong'
        },
    ];

    if(err instanceof ZodError){
        statusCode = 400;
        message = 'this is zod error'
    }
    // else{
    //     statusCode = 404;
    //     message = 'i dont get it'
    // }

    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
        errorSources,
    })
}
export default globalErrorHandler;