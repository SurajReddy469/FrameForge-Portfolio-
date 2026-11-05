const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medicare_plus_db', {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`[MediCare Plus] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MediCare Plus] MongoDB connection failed (${error.message}). Running in Resilient In-Memory Dual-Engine Mode.`);
    isConnected = false;
    return false;
  }
};

const getDbStatus = () => isConnected;

module.exports = { connectDB, getDbStatus };
