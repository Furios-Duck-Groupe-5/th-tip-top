import express, { NextFunction, Request, Response } from 'express';
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
    host: process.env.DB_HOST || 'db',
    database: process.env.DB_NAME || 'thetiptop_db',
    password: process.env.DB_PASSWORD || 'user',
    port: Number(process.env.DB_PORT) || 5432,
});



app.post('/signup', [
    // Validation des champs...
], async (req: Request, res: Response): Promise<void> => { // Utilisez simplement Promise<void>
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Arrête l'exécution après la réponse
    }

    const { nom, prenom, date_de_naissance, sexe, email, mot_de_passe } = req.body;

    try {
        // Vérifier si l'email existe déjà
        const emailExists = await pool.query('SELECT * FROM Utilisateur WHERE email = $1', [email]);
        if (emailExists.rows.length > 0) {
            res.status(400).json({ message: 'L\'email existe déjà.' });
            return;
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(mot_de_passe, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

        // Insérer le nouvel utilisateur dans la base de données
        const newUser = await pool.query(
            `INSERT INTO Utilisateur (nom, prenom, email, mot_de_passe, role_id, date_de_naissance, sexe, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [nom, prenom, email, hashedPassword, 1, date_de_naissance, sexe, true]
        );

        // Retourner la réponse après l'insertion réussie
        res.status(201).json({ message: 'Inscription réussie!!', user: newUser.rows[0] });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erreur d\'insertion :', error.message);
            res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
            return
        } else {
            console.error('Erreur inconnue :', error);
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
            return
        }
    }
});



app.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, mot_de_passe } = req.body;

    // Vérifie que l'email et le mot de passe sont fournis
    if (!email || !mot_de_passe) {
        res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        return; // On utilise "return" pour stopper l'exécution
    }

    try {
        const result = await pool.query('SELECT * FROM Utilisateur WHERE email = $1', [email]);

        // Si aucun utilisateur n'est trouvé, retourne une erreur
        if (result.rows.length === 0) {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            return;
        }

        const user = result.rows[0];

        // Vérifie que le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            return;
        }

        // Crée un jeton JWT avec les informations de l'utilisateur
        const payload = {
            userId: user.id_user,
            roleId: user.role_id
        };
        const secretKey = process.env.JWT_SECRET_KEY || 'Ki0Ka7E8/LINCNrVraSKs6bRL+U4qfP5U80LryzBEAs=';
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Example: 1 hour

        // Exclut le mot de passe des données retournées
        const { mot_de_passe: _, ...userWithoutPassword } = user;

        // Retourne les données de l'utilisateur et le jeton
        res.status(200).json({
            message: 'Connexion réussie!',
            user: userWithoutPassword,
            token,
            roleId: user.role_id
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
        return
    }
});



// Endpoint pour récupérer tous les utilisateurs sert pour ladmin
app.get('/users', async (req: Request, res: Response): Promise<void> => {
    try {
        // Exécutez la requête pour récupérer tous les utilisateurs
        const result = await pool.query('SELECT * FROM Utilisateur');

        // Vérifiez si des utilisateurs existent
        if (result.rows.length === 0) {
              res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
          return
        }

        // Retournez les utilisateurs en réponse
        res.status(200).json(result.rows);
        console.log("result", result.rows)
    } catch (error) {
        // Type guard pour vérifier si l'erreur est une instance de Error
        if (error instanceof Error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error.message);
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
            return
        } else {
            console.error('Erreur inconnue :', error);
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
            return
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
           res.status(404).json({ message: 'Utilisateur non trouvé.' });
            return
        }

        // Supprimez l'utilisateur de la base de données
        await pool.query('DELETE FROM Utilisateur WHERE id_user = $1', [id_user]);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
        console.log("suppression done")
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
        return
    }
});



app.put('/users/:id_user', async (req: Request, res: Response): Promise<void> => {
    const { id_user } = req.params;
    const { prenom, nom, role_id, email, sexe, date_de_naissance } = req.body;

    try {
        // Vérifiez si l'utilisateur existe
        const userExists = await pool.query('SELECT * FROM Utilisateur WHERE id_user = $1', [id_user]);
        if (userExists.rows.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
return        }

        // Mettre à jour l'utilisateur dans la base de données
        await pool.query(
            'UPDATE Utilisateur SET prenom = $1, nom = $2, role_id = $3, email = $4, sexe = $5, date_de_naissance = $6 WHERE id_user = $7',
            [prenom, nom, role_id, email, sexe, date_de_naissance, id_user]
        );

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
        return;
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
            return
        } else {
            console.error('Erreur inconnue :', error);
            res.status(500).json({ message: 'Une erreur inconnue s\'est produite.' });
            return
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
        return
    }
});

app.get('/ticket-statistics', async (req: Request, res: Response): Promise<void> => {
    try {
      // Récupérer le nombre de tickets disponibles (status = true)
      const availableTicketsQuery = `
        SELECT gain, COUNT(*) AS count
        FROM ticket
        WHERE status = true
        GROUP BY gain
      `;
      const availableTickets = await pool.query(availableTicketsQuery);
  console.log("availableTickets",availableTickets)
      // Si aucun ticket n'est trouvé, retourner un message spécifique
      if (availableTickets.rows.length === 0) {
         res.status(404).json({ message: 'Aucun ticket disponible trouvé.' });
         return
      }
  
      // Retourner les résultats des tickets disponibles, groupés par gain
      res.status(200).json({
        availableTickets: availableTickets.rows
      });

    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques des tickets :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des statistiques des tickets.' });
      return
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
        return
    }
});



app.post('/participer', async (req: Request, res: Response): Promise<void> => {
    // TODO enleve les console.log plus ameliore la gestion des erreurs
    const { code_ticket } = req.body; // Le code du ticket que l'utilisateur entre

    // Vérifier que l'utilisateur est authentifié via JWT
    const token = req.headers['authorization']?.split(' ')[1]; // Extrait le token du header Authorization
    if (!token) {
        res.status(401).json({ message: 'Token manquant ou invalide.' });
        return
    }

    try {
        // Décoder le jeton JWT pour obtenir l'ID de l'utilisateur
        if (token) {
            console.log("bonjour")
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY || 'Ki0Ka7E8/LINCNrVraSKs6bRL+U4qfP5U80LryzBEAs=');
            const userId = decoded.userId;

            // Vérifier si le code de ticket existe et si le statut est true
            const result = await pool.query(
                'SELECT * FROM ticket WHERE code_ticket = $1 AND status = true AND remis = false',
                [code_ticket]
            );

            if (result.rows.length === 0) {
                res.status(404).json({ message: 'Code de ticket invalide ou déjà utilisé.' });
                console.log("code invalide")
                return
            }

            // Récupérer l'ID du ticket trouvé
            const ticket = result.rows[0];

            // Vérifier si le ticket est déjà validé (statut false)
            if (!ticket.status) {
                res.status(400).json({ message: 'Le code de ticket a déjà été utilisé.' });
                console.log("deja valide")
                return
            }

            // Mettre à jour le ticket pour l'attribuer à l'utilisateur (remis à true)
            await pool.query(
                'UPDATE ticket SET id_user = $1, date_validation = $2, status = false WHERE id_ticket = $3',
                [userId, new Date(), ticket.id_ticket]
            );

            // Répondre avec un message de succès
            res.status(200).json({ message: 'Vous avez participé avec succès en utilisant le code de ticket.' });
            console.log("succes")
        }
    } catch (error) {
        console.log("erreur")
        console.error('Erreur lors de la participation :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la participation.' });
        return
    }
});

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extraire le token de l'en-tête Authorization

    if (!token) {
        res.status(401).json({ message: 'Token manquant ou invalide.' });
        return
    }
    if (token) {
        try {
            // Décoder et vérifier le token
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY || 'Ki0Ka7E8/LINCNrVraSKs6bRL+U4qfP5U80LryzBEAs=');
            req.userId = decoded.userId;  // Ajouter l'ID de l'utilisateur à la requête
            next();  // Passer au middleware suivant (votre route PUT)
        } catch (error) {
            console.error('Erreur lors de la vérification du token :', error);
            res.status(401).json({ message: 'Token invalide ou expiré.' });
            return
        }
    };
}

export default authenticateJWT;

// Endpoint pour mettre à jour le profil utilisateur
app.put('/user-profile', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const { prenom, nom, email, sexe, date_de_naissance } = req.body;
    const userId = req.userId;  // Récupérer l'ID de l'utilisateur depuis le token JWT

    try {
        // Vérifier si l'utilisateur existe
        const result = await pool.query('SELECT * FROM Utilisateur WHERE id_user = $1', [userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
            return
        }

        // Mettre à jour les informations de l'utilisateur dans la base de données
        await pool.query(
            'UPDATE Utilisateur SET prenom = $1, nom = $2, email = $3, sexe = $4, date_de_naissance = $5 WHERE id_user = $6',
            [prenom, nom, email, sexe, date_de_naissance, userId]
        );

        res.status(200).json({ message: 'Profil mis à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil.' });
        return
    }
});
// Endpoint pour récupérer le profil utilisateur
app.get('/user-profile', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;  // Récupérer l'ID de l'utilisateur depuis le token JWT

    try {
        // Rechercher l'utilisateur par son ID
        const result = await pool.query('SELECT prenom, nom, email, sexe, date_de_naissance FROM Utilisateur WHERE id_user = $1', [userId]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
            return;
        }

        // Retourner les informations de l'utilisateur
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du profil.' });
        return;
    }
});

app.post('/grand-tirage', async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Récupérer un ticket aléatoire dont le statut est 'false'
        const ticketResult = await pool.query(
            'SELECT * FROM ticket WHERE status = false ORDER BY RANDOM() LIMIT 1'
        );
        console.log("ticketResult", ticketResult);

        // Si aucun ticket n'est trouvé
        if (ticketResult.rows.length === 0) {
            res.status(404).json({ message: 'Aucun ticket avec le statut "false" trouvé.' });
            return;
        }

        const ticket = ticketResult.rows[0];
        console.log("ticket", ticket);

        // 2. Récupérer l'id_user associé à ce ticket
        const idUser = ticket.id_user;
        console.log("idUser", idUser);

        // 3. Récupérer l'utilisateur dont l'id_user correspond à celui du ticket
        const userResult = await pool.query(
            'SELECT prenom, nom, email FROM Utilisateur WHERE id_user = $1',
            [idUser]
        );
        console.log("userResult", userResult);

        // Si aucun utilisateur n'est trouvé
        if (userResult.rows.length === 0) {
            res.status(404).json({ message: 'Utilisateur associé au ticket non trouvé.' });
            return;
        }

        const user = userResult.rows[0];

        // 4. Retourner le prénom, nom et email de l'utilisateur
        res.status(200).json({
            message: 'Tirage effectué avec succès.',
            winner: {
                prenom: user.prenom,  // Prénom
                nom: user.nom,        // Nom
                email: user.email,    // Email
            },
        });
    } catch (error) {
        console.error('Erreur lors du tirage :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors du tirage.' });
        return;
    }
});


app.post('/get-user-tickets', async (req: Request, res: Response): Promise<void> => {
    const { email, nom } = req.body;

    if (!email || !nom) {
        res.status(400).json({ error: 'L\'email et le nom sont requis.' });
        return;
    }

    try {
        const userQueryResult = await pool.query(
            'SELECT * FROM Utilisateur WHERE email = $1 AND nom = $2',
            [email, nom]
        );

        if (userQueryResult.rows.length === 0) {
            const emailCheckResult = await pool.query(
                'SELECT * FROM Utilisateur WHERE email = $1',
                [email]
            );

            if (emailCheckResult.rows.length === 0) {
                res.status(404).json({ error: 'Email incorrect ou utilisateur non trouvé.' });
            } else {
                res.status(404).json({ error: 'Nom incorrect pour cet email.' });
            }
            return;
        }

        const user = userQueryResult.rows[0];
        const userId = user.id_user;

        const ticketQueryResult = await pool.query(
            'SELECT * FROM ticket WHERE id_user = $1',
            [userId]
        );

        const gains = ticketQueryResult.rows.map(ticket => ({
            id_ticket: ticket.id_ticket,
            gain: ticket.gain,
            remis: ticket.remis, 
        }));
        console.log("gain",gains)

        res.status(200).json({
            message: 'Tickets récupérés avec succès',
            gains,
            id_user: userId
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des tickets :', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des tickets.' });
        return
    }
});


app.put('/update-ticket-status/:id_ticket', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const { id_ticket } = req.params;
    const { newStatus } = req.body;

    console.log("ID du ticket reçu:", id_ticket);
    console.log("Nouveau statut reçu:", newStatus);

    const statusToUpdate = newStatus ?? true; // Utilisation de true comme valeur par défaut
    console.log("Statut à mettre à jour:", statusToUpdate);

    try {
        // Vérifier si le ticket existe dans la base de données
        const ticketExists = await pool.query('SELECT * FROM ticket WHERE id_ticket = $1', [id_ticket]);
        console.log("Ticket trouvé dans la base de données:", ticketExists.rows);

        if (ticketExists.rows.length === 0) {
            res.status(404).json({ message: 'Ticket non trouvé.' });
            return;
        }

        // Si le ticket existe, mettre à jour à la fois le statut et le champ "remis"
        const updateResult = await pool.query(
            'UPDATE ticket SET status = $1, remis = true WHERE id_ticket = $2',
            [statusToUpdate, id_ticket]
        );

        console.log("Résultat de la mise à jour du statut et remis:", updateResult);

        // Retourner une réponse avec le ticket mis à jour
        res.status(200).json({
            message: 'Statut du ticket et "remis" mis à jour avec succès.',
            updatedTicket: {
                id_ticket: id_ticket,
                status: statusToUpdate,
                remis: true // Puisque nous avons mis à jour "remis" en true
            }
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut et du gain:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut et du gain.' });
        return;
    }
});


app.post('/user-historique', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId; // Get the authenticated user's ID from the request

    if (!userId) {
        res.status(401).json({ error: 'Utilisateur non authentifié.' });
        return; // If no userId, return an error
    }

    try {
        // Query the database to fetch the tickets for the authenticated user
        const ticketQueryResult = await pool.query(
            'SELECT * FROM ticket WHERE id_user = $1',
            [userId]
        );

        // Process the ticket data and map it to the desired format
        const gains = ticketQueryResult.rows.map(ticket => ({
            id_ticket: ticket.id_ticket,
            gain: ticket.gain,
            remis: ticket.remis ? 'Remis' : 'Non remis', 
            date_validation: ticket.date_validation // Assuming the date is stored in date_validation
        }));
        console.log("gains",gains)

        // Respond with the user's ticket data
        res.status(200).json({
            message: 'Tickets récupérés avec succès.',
            gains,
            id_user: userId
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des tickets :', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des tickets.' });
        return;
    }
});



// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
