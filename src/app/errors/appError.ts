class AppError extends Error {
    public statusCodes: number;
    constructor(
        statusCodes: number,
        message: string,
        stack?: ''
    ) {
        super(message)
        this.statusCodes = statusCodes;
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default AppError;