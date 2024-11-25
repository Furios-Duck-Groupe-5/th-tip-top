import request from 'supertest';
import { Pool } from 'pg';
import nodemailer from 'nodemailer';
import { app } from '../../backend';

jest.mock('pg', () => {
    const mPool = {
        query: jest.fn(),
        on: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn(),
    }),
}));

describe('API Tests', () => {
    let server: any;
    let mockPool: any;
    let mockTransporter: any;
    const testPort = process.env.TEST_PORT || 4002; // Port dédié pour les tests

    beforeAll(() => {
        // Démarrer le serveur sur un port spécifique pour les tests
        server = app.listen(testPort);
    });

    afterAll(() => {
        // Arrêter le serveur après les tests
        server.close();
    });

    beforeEach(() => {
        mockPool = new Pool();
        mockTransporter = nodemailer.createTransport();
    });

    describe('POST /send-newsletter', () => {
        it('should send a newsletter email to all recipients', async () => {
            // Simuler la récupération des emails de la base de données
            mockPool.query.mockResolvedValueOnce({
                rows: [{ email: 'test@example.com' }],
            });

            const response = await request(app)
                .post('/send-newsletter')
                .send({
                    subject: 'Test Subject',
                    message: 'Test Message',
                });

            // Vérifications
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Newsletter envoyée avec succès!');
            expect(mockTransporter.sendMail).toHaveBeenCalledWith(
                expect.objectContaining({
                    to: 'test@example.com',
                    subject: 'Test Subject',
                    text: 'Test Message',
                })
            );
        });

        it('should return 400 if subject or message is missing', async () => {
            const response = await request(app)
                .post('/send-newsletter')
                .send({
                    subject: '',
                    message: 'Test Message',
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Sujet et message sont requis.');

            const responseWithoutMessage = await request(app)
                .post('/send-newsletter')
                .send({
                    subject: 'Test Subject',
                    message: '',
                });

            expect(responseWithoutMessage.status).toBe(400);
            expect(responseWithoutMessage.body.message).toBe('Sujet et message sont requis.');
        });
    });

    describe('POST /add-email', () => {
        it('should return 400 if email is not provided', async () => {
            const response = await request(app).post('/add-email').send({});
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('L\'email est requis.');
        });

        it('should return 400 if email format is invalid', async () => {
            const response = await request(app).post('/add-email').send({ email: 'invalid-email' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Adresse email invalide.');
        });
    });
});
