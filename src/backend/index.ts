import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import * as XLSX from 'xlsx';
import jwt from 'jsonwebtoken';

import fs from 'fs';
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
        // TODO Pourquoi le rows[0] ?
        res.status(201).json({ message: 'Inscription réussie!!', user: newUser.rows[0] });
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

app.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
         res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    try {
        const result = await pool.query('SELECT * FROM Utilisateur WHERE email = $1', [email]);
        if (result.rows.length === 0) {
             res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isPasswordValid) {
             res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Créer un jeton JWT avec les informations de l'utilisateur
        const payload = {
            userId: user.id_user, 
            roleId: user.role_id
        };
        const secretKey = process.env.JWT_SECRET_KEY || 'Ki0Ka7E8/LINCNrVraSKs6bRL+U4qfP5U80LryzBEAs='; // Utilise une clé secrète sécurisée
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expirant au bout d'1 heure

        // Exclure le mot de passe des données retournées
        const { mot_de_passe: _, ...userWithoutPassword } = user

        // Retourner les données de l'utilisateur et le jeton
        // TODO il faut voir comment faire apres hebergement
        res.status(200).json({
            message: 'Connexion réussie!',
            user: userWithoutPassword,
            token,
            roleId: user.role_id
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
});





// Endpoint pour récupérer tous les utilisateurs sert pour ladmin
app.get('/users', async (req: Request, res: Response): Promise<void> => {
    try {
        // Exécutez la requête pour récupérer tous les utilisateurs
        const result = await pool.query('SELECT * FROM Utilisateur');

        // Vérifiez si des utilisateurs existent
        if (result.rows.length === 0) {
           // return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
           console.log("aucun utilisateur trouvé")
        }

        // Retournez les utilisateurs en réponse
        res.status(200).json(result.rows);
        console.log("result",result.rows)
    } catch (error) {
        // Type guard pour vérifier si l'erreur est une instance de Error
        if (error instanceof Error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error.message);
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
        } else {
            console.error('Erreur inconnue :', error);
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
        }
    }
});

// Endpoint pour supprimer un utilisateur par ID
app.delete('/users/:id_user', async (req: Request, res: Response): Promise<void> => {
    const { id_user } = req.params;

    try {
        // Vérifiez si l'utilisateur existe d'abord
        const userExists = await pool.query('SELECT * FROM Utilisateur WHERE id_user = $1', [id_user]);
        if (userExists.rows.length === 0) {
        //    return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        console.log("non trouve")
        }

        // Supprimez l'utilisateur de la base de données
        await pool.query('DELETE FROM Utilisateur WHERE id_user = $1', [id_user]);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
        console.log("suppression done")
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
});



app.put('/users/:id_user', async (req: Request, res: Response): Promise<void> => {
    const { id_user } = req.params;
    const { prenom, nom, role_id, email, sexe, date_de_naissance } = req.body;
  
    try {
      // Vérifiez si l'utilisateur existe
      const userExists = await pool.query('SELECT * FROM Utilisateur WHERE id_user = $1', [id_user]);
      if (userExists.rows.length === 0) {
    //    return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      console.log("non rnouvé")
      }
  
      // Mettre à jour l'utilisateur dans la base de données
      await pool.query(
        'UPDATE Utilisateur SET prenom = $1, nom = $2, role_id = $3, email = $4, sexe = $5, date_de_naissance = $6 WHERE id_user = $7',
        [prenom, nom, role_id, email, sexe, date_de_naissance, id_user]
      );
  
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
  });


  app.post('/add-employee', async (req: Request, res: Response): Promise<void> => {
    const { nom, prenom, date_de_naissance, sexe, email, mot_de_passe } = req.body;
    const role_id = 3; // Assign role_id 3 for employees

    try {
        // Check if the email already exists
        const emailExists = await pool.query('SELECT * FROM Utilisateur WHERE email = $1', [email]);
        if (emailExists.rows.length > 0) {
            console.log("email existe deja")
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(mot_de_passe, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

        // Log for debugging purposes
        console.log({
            nom,
            prenom,
            email,
            hashedPassword,
            role_id, // Now set to 3 for employees
            date_de_naissance,
            sexe,
            status: true,
        });

        // Insert the new employee into the database with role_id = 3
        const newEmployee = await pool.query(
            `INSERT INTO Utilisateur (nom, prenom, email, mot_de_passe, role_id, date_de_naissance, sexe, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [nom, prenom, email, hashedPassword, role_id, date_de_naissance, sexe, true]
        );

        // Respond with a success message
        res.status(201).json({ message: 'Nouvel employé ajouté avec succès!', employee: newEmployee.rows[0] });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erreur lors de l\'ajout de l\'employé :', error.message);
            res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'employé.' });
        } else {
            console.error('Erreur inconnue :', error);
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
        }
    }
});

app.get('/statistics', async (req: Request, res: Response): Promise<void> => {
    try {
        // Requête pour obtenir les statistiques de sexe
        const genderStats = await pool.query(`
            SELECT sexe, COUNT(*) AS count
            FROM Utilisateur
            GROUP BY sexe
        `);

        // Requête pour obtenir les statistiques d'âge
        const ageStats = await pool.query(`
            SELECT 
                CASE 
                    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_de_naissance)) BETWEEN 18 AND 25 THEN '18-25'
                    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_de_naissance)) BETWEEN 26 AND 35 THEN '26-35'
                    WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_de_naissance)) BETWEEN 36 AND 50 THEN '36-50'
                    ELSE '51+'
                END AS age_group,
                COUNT(*) AS count
            FROM Utilisateur
            GROUP BY age_group
            ORDER BY age_group
        `);

        // Formater et retourner les résultats
        res.status(200).json({
            genderStats: genderStats.rows,
            ageStats: ageStats.rows
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des statistiques.' });
    }
});

// TODO date de naissanance ## pas de id pas de status et pas de mot de passe
app.get('/export-users', async (req: Request, res: Response): Promise<void> => {
    try {
        // Récupérer les utilisateurs de la base de données
        const result = await pool.query('SELECT * FROM Utilisateur');

        if (result.rows.length === 0) {
            console.log("Aucun utilisateur trouvé pour l'exportation");
            res.status(404).json({ message: 'Aucun utilisateur trouvé pour l\'exportation.' });
            return;
        }

        // Exclure le mot de passe et formater les dates
        const formattedRows = result.rows.map((row) => {
            const { mot_de_passe, ...userWithoutPassword } = row; // Exclure le mot de passe
            
            // Formater la date de naissance
            if (userWithoutPassword.date_de_naissance) {
                userWithoutPassword.date_de_naissance = new Date(userWithoutPassword.date_de_naissance).toLocaleDateString('fr-FR'); // Format date
            }
            
            return userWithoutPassword;
        });

        // Créer une feuille de calcul avec les données des utilisateurs
        const worksheet = XLSX.utils.json_to_sheet(formattedRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Utilisateurs');

        // Ajuster les largeurs des colonnes
        const columnWidths = formattedRows.reduce((acc: any, row: any) => {
            Object.keys(row).forEach((key) => {
                const cellValue = row[key]?.toString() || ''; // Convertir la valeur en chaîne
                const cellLength = cellValue.length;

                // Si la colonne n'existe pas encore, initialiser sa largeur
                if (!acc[key] || cellLength > acc[key]) {
                    acc[key] = cellLength; // Mettre à jour avec la longueur maximale
                }
            });
            return acc;
        }, {});

        // Convertir les largeurs en format attendu par XLSX
        const colWidths = Object.keys(columnWidths).map((key) => ({
            wch: columnWidths[key] + 2 // Ajouter un peu d'espace (2 caractères)
        }));

        // Appliquer les largeurs aux colonnes
        worksheet['!cols'] = colWidths;

        // Écrire le fichier dans un buffer
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // Envoyer le fichier Excel en tant que réponse
        res.setHeader('Content-Disposition', 'attachment; filename="utilisateurs.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        console.error('Erreur lors de l\'exportation des utilisateurs :', error);
        res.status(500).json({ message: 'Erreur lors de l\'exportation des utilisateurs.' });
    }
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});