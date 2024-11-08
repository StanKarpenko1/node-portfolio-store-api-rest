import { NextFunction, Request, Response } from "express";

const Products = require('../models/products')
 
const getAllProductsStatic = async ( req: Request , res: Response ) => {
    const products = await Products.find({ 
       
    }).sort('-name price')
    res.status(200).json({ products, length: products.length}) ;
}

const getAllProducts = async ( req: Request , res: Response ) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query as { 
        featured?: string, 
        company?: string, 
        name?: string, 
        sort?: string,
        fields?: string,
        numericFilters?: string
    };

    const queryObject: { 
        featured?: boolean,
        company?: string, 
        name?: string | { $regex: string; $options: string },
        [key: string]: any


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
    if (numericFilters){
       const operatorMap : { [key: string]: string} = {
        '>':'$gt',
        '>=':'$gte',
        '=':'$eq',
        '<':'$lt',
        '<=':'$lte',
       } 
       const regex = /\b(<|>|>=|<=|=)\b/g

       let filters: string | void = numericFilters.replace(
        regex, 
        (match) => `-${operatorMap[match]}-`);

        const options = [ 'price', 'rating' ];
        filters = filters.split(',').forEach((item: string) => {
            const [field, operator, value] : Array<string> = item.split('-');
            if (options.includes(field)){
                queryObject[field] = { [operator]: Number(value) }
            }
        })
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
    const skip = (page-1 ) * limit

    result = result.skip(skip).limit(limit)

    const products = await result

    res.status(200).json({ products, length: products.length}) ; 
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}