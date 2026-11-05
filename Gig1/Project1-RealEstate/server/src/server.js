import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

// Load environment configuration
dotenv.config();

const start = async () => {
  if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)) {
    throw new Error('JWT_SECRET must be configured with at least 32 characters in production');
  }
  try {
    await connectDB();
  } catch (err) {
    if (process.env.NODE_ENV === 'production') throw err;
    console.warn(`[UrbanNest] MongoDB offline (${err.message}). Server started with fallback.`);
  }
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`[UrbanNest Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));
};

start().catch((error) => {
  console.error(`[UrbanNest Server] Startup failed: ${error.message}`);
  process.exit(1);
});
