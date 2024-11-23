import { Pool } from 'pg';  // Pour simuler la connexion à la base de données
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { login } from './login';

// Mock de la base de données
jest.mock('pg', () => {
    return {
        Pool: jest.fn().mockImplementation(() => {
            return {
                query: jest.fn(),
            };
        }),
    };
});

// Mock de bcrypt
jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

// Mock de jwt
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('login', () => {
    let poolQueryMock: jest.Mock;
    let bcryptCompareMock: jest.Mock;
    let jwtSignMock: jest.Mock;

    beforeEach(() => {
        poolQueryMock = jest.fn();
        (Pool as unknown as jest.Mock).mockImplementationOnce(() => ({
            query: poolQueryMock, 
        }));
        
        bcryptCompareMock = bcrypt.compare as jest.Mock;
        jwtSignMock = jwt.sign as jest.Mock;
    });



    it('should return an error if email is not found', async () => {
        const invalidEmail = 'ok@outlook.com ';
        const validPassword = 'okokok';

        poolQueryMock.mockResolvedValueOnce({ rows: [] });

        await expect(login(invalidEmail, validPassword)).rejects.toThrow('Email ou mot de passe incorrect.');
    });

    it('should return an error if password is incorrect', async () => {
        const validEmail = 'ok@outlook.com';
        const invalidPassword = 'okodkok';

        poolQueryMock.mockResolvedValueOnce({
            rows: [{ id_user: 1, email: validEmail, mot_de_passe: 'hashedpassword', role_id: 1 }],
        });

        bcryptCompareMock.mockResolvedValueOnce(false);

        await expect(login(validEmail, invalidPassword)).rejects.toThrow('Email ou mot de passe incorrect.');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

