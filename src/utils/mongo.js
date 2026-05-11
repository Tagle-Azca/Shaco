import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.MONGO_URI;

const connectMongo = async () => {
  try {
    if (!dbURI) {
      throw new Error('MONGO_URI is not configured');
    }

    await mongoose.connect(dbURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB error:', err));
db.on('disconnected', () => console.log('MongoDB disconnected'));

export { connectMongo, db };