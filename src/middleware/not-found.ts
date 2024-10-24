import { NextFunction, Request, Response } from "express";


const notFound = (req: Request , res: Response) => 
    res.status(404).json({
        status: "404",
        msg: `Route does not exist`
    });


module.exports = notFound