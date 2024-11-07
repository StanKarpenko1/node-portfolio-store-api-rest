import { NextFunction, Request, Response } from "express";

const Products = require('../models/products')
 
const getAllProductsStatic = async ( req: Request , res: Response ) => {
    const products = await Products.find({ 
       
    }).sort('-name price')
    res.status(200).json({ products, length: products.length}) ;
}

const getAllProducts = async ( req: Request , res: Response ) => {
    const { featured, company, name, sort, fields } = req.query as { 
        featured?: string, 
        company: string, 
        name: string, 
        sort: string,
        fields: string,
    };

    const queryObject: { 
        featured?: boolean,
        company?: string, 
        name?: string | { $regex: string; $options: string }

     } = {} 

    if (featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = { $regex: name, $options: 'i'}
    }

    let result = Products.find(queryObject);

    //#region sort
    if (sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }
    //#endregion sort

    //#region fields
    if (fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    } 
    //#endregion fields

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1 ) * limit

    result = result.skip(skip).limit(limit)

    const products = await result

    res.status(200).json({ products, length: products.length}) ; 
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}