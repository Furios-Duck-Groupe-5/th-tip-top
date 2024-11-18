import crypto from 'crypto';

const refreshTokenSecret = crypto.randomBytes(64).toString('hex');
console.log("JWT_REFRESH_SECRET_KEY:", refreshTokenSecret);

