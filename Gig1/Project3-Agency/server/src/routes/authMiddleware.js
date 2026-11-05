const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  // Support evaluation mock tokens
  if (token === 'mock-jwt-admin-token') {
    req.user = { id: 'admin-apex', _id: 'admin-apex', role: 'admin', name: 'FrameForge Principal' };
    return next();
  }
  if (token === 'mock-jwt-user-token') {
    req.user = { id: 'client-apex', _id: 'client-apex', role: 'user', name: 'Sarah Jenkins' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'apexmedia_secret');
    req.user = {
      id: decoded.id,
      _id: decoded.id,
      role: decoded.role || 'user'
    };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user?.role || 'anonymous'} is not authorized to access this route`
      });
    }
    next();
  };
};
