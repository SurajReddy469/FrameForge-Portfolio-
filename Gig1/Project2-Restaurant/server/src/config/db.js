const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');

const migrateReservationCapacityIndex = async () => {
  const db = mongoose.connection.db;
  const collectionExists = await db.listCollections({ name: Reservation.collection.collectionName }).hasNext();
  if (!collectionExists) return;

  const indexes = await Reservation.collection.indexes();
  const legacyUniqueSlotIndex = indexes.find(index => index.key?.slotKey === 1 && index.unique);
  if (legacyUniqueSlotIndex) {
    await Reservation.collection.dropIndex(legacyUniqueSlotIndex.name);
  }
  await Reservation.collection.createIndex({ slotKey: 1 });
};

// Prevent Mongoose from hanging queries indefinitely if Mongo is offline
mongoose.set('bufferTimeoutMS', 1500);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gourmethaven_db', {
      serverSelectionTimeoutMS: 2000
    });
    await migrateReservationCapacityIndex();
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Production database connection is required: ${error.message}`);
    }
    console.warn(`[MongoDB Warning] Local MongoDB service not active or unreachable: ${error.message}`);
    console.warn(`[GourmetHaven Service] Running in resilient hybrid mode with complete mock data engine.`);
    return null;
  }
};

module.exports = connectDB;
