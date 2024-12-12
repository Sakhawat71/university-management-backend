import mongoose from "mongoose";
import { TErrorSource } from "../interface/error";

const handelValidationError = (err: mongoose.Error.ValidationError) => {
    const errroSources: TErrorSource = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: value?.path,
            message: value?.message
        }
    });

    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errroSources,
    }
};

export default handelValidationError;