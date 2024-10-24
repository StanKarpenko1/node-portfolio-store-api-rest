import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import { NextFunction, Request, Response } from "express";
import 'express-async-errors' ;

const productsRouter = require('./routes/products')

dotenv.config();

const app = express();

// Define port and MongoDB connection string
const port = process.env.port || 5001;
const mongoURL = process.env.MONGO_URL;

const notFoundMiddleware = require('./middleware/not-found') ;
const errorMiddleware = require('./middleware/error-handler') ;

// Middleware
app.use(cors({ credentials: true }));
app.use(express.json()) ;

// routes
app.get('/', (req: Request, res: Response ) => {
    res.send('On Home Page') ; 
}) ;

// product routes
app.use('/api/v1/products', productsRouter)
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
    try {
        // connect DB
        await connectDB(mongoURL) ; 

        // start server
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port} ... `);
        });

    } catch (e) {
        console.log (e)
    }
}

start () ;