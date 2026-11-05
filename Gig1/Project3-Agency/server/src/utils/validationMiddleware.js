// Validation Middleware for ApexMedia

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Valid full name required (min 2 characters)' });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid business email' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  // Security: strip role completely to prevent privilege escalation
  delete req.body.role;

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  next();
};

exports.validateLead = (req, res, next) => {
  // Support aliases from different frontend forms
  req.body.clientName = (req.body.clientName || req.body.name || '').trim();
  req.body.clientEmail = (req.body.clientEmail || req.body.email || '').trim().toLowerCase();
  req.body.companyName = (req.body.companyName || req.body.company || '').trim();
  req.body.clientPhone = (req.body.clientPhone || req.body.phone || '').trim();
  req.body.message = (req.body.message || req.body.notes || req.body.description || '').trim();

  // Normalize projectType
  let pType = req.body.projectType || req.body.serviceType || 'Full-Stack Web';
  if (pType.toLowerCase().includes('saas')) pType = 'SaaS Platform';
  else if (pType.toLowerCase().includes('mobile')) pType = 'Mobile App';
  else if (pType.toLowerCase().includes('enterprise') || pType.toLowerCase().includes('cloud')) pType = 'Custom Enterprise';
  else if (pType.toLowerCase().includes('design') || pType.toLowerCase().includes('ui')) pType = 'Design System';
  else pType = 'Full-Stack Web';
  req.body.projectType = pType;

  // Fallback for short messages
  if (req.body.message.length < 10) {
    req.body.message = `Inquiry regarding ${req.body.projectType} architecture and implementation.`;
  }

  const { clientName, clientEmail, projectType, message } = req.body;

  if (!clientName || clientName.length < 2) {
    return res.status(400).json({ success: false, message: 'Contact name is required (min 2 characters)' });
  }

  if (!clientEmail || !EMAIL_REGEX.test(clientEmail)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid contact email' });
  }

  const validTypes = ['Full-Stack Web', 'SaaS Platform', 'Mobile App', 'Design System', 'Custom Enterprise'];
  if (!projectType || !validTypes.includes(projectType)) {
    return res.status(400).json({
      success: false,
      message: `Invalid project type. Allowed: ${validTypes.join(', ')}`
    });
  }

  if (!message || message.length < 10) {
    return res.status(400).json({ success: false, message: 'Project description must be at least 10 characters' });
  }

  next();
};
