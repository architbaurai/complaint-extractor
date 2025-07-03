import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

export async function connectDB(){

    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n mongoDB  connected, DB host : ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MongoDB connection error : ", error);
        throw error;
    }
}