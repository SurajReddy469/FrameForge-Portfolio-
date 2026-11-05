require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)) {
  console.error('[ApexMedia Server] Production requires JWT_SECRET with at least 32 characters.');
  process.exit(1);
}

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {
    const connection = await connectDB();
    if (process.env.NODE_ENV === 'production' && !connection) {
      throw new Error('Production requires a persistent MongoDB connection.');
    }

    app.listen(PORT, () => {
      console.log(`[ApexMedia Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (err) {
    console.error('[ApexMedia Server Startup Fatal Error]', err);
    process.exit(1);
  }
};

startServer();
