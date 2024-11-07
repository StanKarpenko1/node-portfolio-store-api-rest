import mongoose from 'mongoose';

const connectDB = async (url: string) => {
    return mongoose
        .connect(url)
        .then(() => {
            console.log('CONNECTED TO DB...');
        })
        .catch((err: unknown) => {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error('Unexpected error', err);
            }
        });
};

export default connectDB;
