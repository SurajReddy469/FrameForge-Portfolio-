const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('bufferTimeoutMS', 1500);
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fitpulse_db', {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`[FitPulse DB] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[FitPulse DB Warning] MongoDB unavailable: ${error.message}. Running on dual-engine in-memory persistence.`);
    return null;
  }
};

module.exports = connectDB;
