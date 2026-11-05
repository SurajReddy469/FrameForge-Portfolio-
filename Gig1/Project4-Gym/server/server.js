require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)) {
  console.error('[FitPulse Server] Production requires JWT_SECRET with at least 32 characters.');
  process.exit(1);
}

const PORT = process.env.PORT || 5003;

const startServer = async () => {
  const connection = await connectDB();
  if (process.env.NODE_ENV === 'production' && !connection) {
    throw new Error('Production requires a persistent MongoDB connection.');
  }
  const server = app.listen(PORT, () => {
    console.log(`[FitPulse Server] API live and running on http://localhost:${PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    console.error(`[FitPulse Unhandled Rejection] ${err.message}`);
  });
};

startServer();
