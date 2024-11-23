import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Crée un pool de connexions pour interagir avec la base de données
const pool = new Pool();

// Fonction de connexion
export const login = async (email: string, mot_de_passe: string) => {
    // Vérifie que l'email et le mot de passe sont fournis
    if (!email || !mot_de_passe) {
        throw new Error('Email et mot de passe sont requis.');
    }

    try {
        // Cherche l'utilisateur dans la base de données
        const result = await pool.query('SELECT * FROM Utilisateur WHERE email = $1', [email]);

        // Vérifie si la réponse de la base de données est valide
        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('Email ou mot de passe incorrect.');
        }

        const user = result.rows[0];

        // Vérifie que le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isPasswordValid) {
            throw new Error('Email ou mot de passe incorrect.');
        }

        // Crée un jeton JWT avec les informations de l'utilisateur
        const payload = {
            userId: user.id_user,
            roleId: user.role_id
        };

        const secretKey = process.env.JWT_SECRET_KEY || 'Ki0Ka7E8/LINCNrVraSKs6bRL+U4qfP5U80LryzBEAs=';
        const token = jwt.sign(payload, secretKey, { expiresIn: '356d' });

        // Exclut le mot de passe des données retournées
        const { mot_de_passe: _, ...userWithoutPassword } = user;

        // Retourne les informations de l'utilisateur et le jeton
        return {
            message: 'Connexion réussie!',
            user: userWithoutPassword,
            token
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Erreur lors de la connexion: ${error.message}`);
        } else {
            throw new Error('Erreur inconnue lors de la connexion.');
        }
    }
};
