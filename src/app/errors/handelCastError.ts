import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handelCastErrro = (err : mongoose.Error.CastError) : TGenericErrorResponse => {
    const errorSources : TErrorSource = [{
        path : err.path,
        message : err.message,
    }];

    const statusCode = 400;

    return {
        statusCode ,
        message : 'Cast Error',
        errorSources,
    }
}


export default handelCastErrro;