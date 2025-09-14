import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected:', conn.connection.host);
    } catch (error) {
        console.error('Error connecting to DB:', error);
        process.exit(1);
    }
};

export default connectDB;