
import 'dotenv/config';
import connectDB from './db/connect';

const Product = require('./models/products')
const jsonProducts = require('./products.json');

const mongoURL: any = process.env.MONGO_URL;


const start = async () => {
    try {
        await connectDB(mongoURL)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log ('SUCCESS !!!')
        process.exit(0)
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

start()