require('dotenv').config();
const crypto = require('crypto');
const app = require('./src/app');
const connectDB = require('./src/config/db');

if (process.env.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error('[Server Startup Fatal Error] Production requires JWT_SECRET with at least 32 characters.');
    process.exit(1);
  }
} else if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = crypto.randomBytes(48).toString('hex');
  console.warn('[Auth] Using a temporary process-local JWT secret for development.');
}

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Await database connection or fallback determination before listening
    await connectDB();

    app.listen(PORT, () => {
      console.log(`[GourmetHaven Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (err) {
    console.error('[Server Startup Fatal Error]', err);
    process.exit(1);
  }
};

startServer();
