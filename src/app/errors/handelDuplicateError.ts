/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handelDuplicateError = (err : any): TGenericErrorResponse => {

    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    const errorSources: TErrorSource = [{
        path: err.path || '',
        message: `${extractedMessage} is already exists`
    }]

    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate Key Error',
        errorSources
    }
};

export default handelDuplicateError;