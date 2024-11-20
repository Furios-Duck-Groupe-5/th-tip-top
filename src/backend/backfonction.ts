const jwtSecretKey = process.env.JWT_SECRET_KEY || 'Ki0Ka7E8/LINCNrVraSKs6bRL+U4qfP5U80LryzBEAs=';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const generateAccessToken = (user: any) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        jwtSecretKey,
        {
            expiresIn: '1d',
        }
    );
};