// 404 Route Not Found
export const notFound = (req, res, next) => {
  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Centralized Error Handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.name === 'ValidationError' ? 400
    : err.name === 'CastError' ? 400
      : err.code === 11000 ? 409
        : (res.statusCode === 200 ? 500 : res.statusCode);

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' && statusCode >= 500 ? 'An unexpected server error occurred' : err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
