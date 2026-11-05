require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');
const { seedDatabase } = require('./utils/seeder');

if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)) {
  console.error('[MediCare Plus] Production requires JWT_SECRET with at least 32 characters.');
  process.exit(1);
}

const PORT = process.env.PORT || 5004;

const startServer = async () => {
  // Attempt DB connection
  const connected = await connectDB();
  if (process.env.NODE_ENV === 'production' && !connected) {
    throw new Error('Production requires a persistent MongoDB connection.');
  }
  if (process.env.NODE_ENV !== 'production') await seedDatabase();

  app.listen(PORT, () => {
    console.log(`[MediCare Plus] API running on http://localhost:${PORT}`);
    console.log(`[MediCare Plus] Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();
