const mongoose = require('mongoose');

mongoose.set('bufferTimeoutMS', 1500);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/apexmedia_db', {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`[ApexMedia DB Connected] Host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[ApexMedia DB Warning] Local MongoDB service unreachable: ${error.message}`);
    console.warn(`[ApexMedia Service] Running in resilient hybrid mode with complete mock data engine.`);
    return null;
  }
};

module.exports = connectDB;
