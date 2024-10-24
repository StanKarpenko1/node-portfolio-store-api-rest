
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
const { createCustomError, CustomError } = require('../errors/custom-error')


const errorHandlerMiddleware = (

    err: any,
    req: Request,
    res: Response,
    next: NextFunction,

) => {

    const errorStatus = err.statusCode;

    if (err instanceof CustomError) {
        return res.status(errorStatus).json({ msg: err.message })
    }

    return res.status(500).json({ msg: 'Server error'})
}

module.exports = errorHandlerMiddleware