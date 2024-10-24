import { NextFunction, Request, Response } from "express";
 
const getAllProductsStatic = async ( req: Request , res: Response ) => {
    res.status(200).json({ msg: `get all products -  testing route`}) ;
}

const getAllProducts = async ( req: Request , res: Response ) => {
    res.status(200).json({ msg: `get all products`}) ;
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}