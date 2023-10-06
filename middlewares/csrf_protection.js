import crypto from 'crypto';

const generateCSRFToken = (req, res, next) => {
    if (!req.session.csrfToken) {
      req.session.csrfToken = crypto.randomBytes(16).toString('hex');
    }
    res.locals.csrfToken = req.session.csrfToken;
    next();
};
  
function verifyCSRFToken(req, res, next) {
    const requestToken = req.body.csrfToken || req.headers['x-csrf-token'];
    if (requestToken !== req.session.csrfToken) {
      return res.status(403).send('Invalid CSRF token');
    }
    next();
}

const CSRFProtection = { generateCSRFToken, verifyCSRFToken };

export default CSRFProtection;