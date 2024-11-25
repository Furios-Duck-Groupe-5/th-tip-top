import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'Ki0Ka7E8/LINCNrVraSKs6bRL+U4qfP5U80LryzBEAs=';

const generateAccessToken = (user: any) => {
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

const verifyJWT = (token: string, secret: string): void => {
    jwt.verify(token, secret, (err: { message: any; expiredAt: any; }, decoded: any) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                console.log('JWT Expired Error:', err.message); 
                console.log('Le token a expiré à :', err.expiredAt); 
            } else if (err instanceof JsonWebTokenError) {
                console.log('JWT Error:', err.message); 
            } else {
                console.log('Erreur inconnue lors de la vérification du JWT:', err);
            }
        } else {
            console.log('JWT valide. Données décryptées :', decoded);
        }
    });
};

module.exports = {
    generateAccessToken,
    verifyJWT
};
