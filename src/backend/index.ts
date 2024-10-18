import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = 4001;

// Middleware pour analyser les données JSON
app.use(express.json());

// Configurez CORS
app.use(cors());

// Configurez la connexion à la base de données
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'thetiptop',
    password: process.env.DB_PASSWORD || 'user',
    port: Number(process.env.DB_PORT) || 5432,
});



app.post('/signup', [
    // Validation des champs...
], async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //  return res.status(400).json({ errors: errors.array() });
    }

    const { nom, prenom, date_de_naissance, sexe, email, mot_de_passe } = req.body;

    try {
        // Vérifier si l'email existe déjà
        const emailExists = await pool.query('SELECT * FROM Utilisateur WHERE email = $1', [email]);
        if (emailExists.rows.length > 0) {
        //    return res.status(400).json({ message: 'L\'email existe déjà.' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(mot_de_passe, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

        // Debug: Affichez les données à insérer
        console.log({
            nom,
            prenom,
            email,
            hashedPassword,
            role_id: 1,
            date_de_naissance,
            sexe,
            status: true,
        });

        // Insérer le nouvel utilisateur dans la base de données
        const newUser = await pool.query(
            `INSERT INTO Utilisateur (nom, prenom, email, mot_de_passe, role_id, date_de_naissance, sexe, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [nom, prenom, email, hashedPassword, 1, date_de_naissance, sexe, true]
        );
        console.log("bonjour")

        // Retourner la réponse après l'insertion réussie
        res.status(201).json({ message: 'Inscription réussie', user: newUser.rows[0] });
    }  catch (error) {
        if (error instanceof Error) {
            console.error('Erreur d\'insertion :', error.message);
            res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
        } else {
            console.error('Erreur inconnue :', error);
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
        }
    }
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
