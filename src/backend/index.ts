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

    // Vérifiez si l'email et le mot de passe sont fournis
    if (!email || !mot_de_passe) {
      //  return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
      console.log("ou es le mdp ou le email")
    }

    try {
        // Récupérez l'utilisateur par email
        const result = await pool.query('SELECT * FROM Utilisateur WHERE email = $1', [email]);
        if (result.rows.length === 0) {
          //  return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
          console.log("incorrect email user")
        }

        const user = result.rows[0];

        // Comparez le mot de passe fourni avec le mot de passe haché
        const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isPasswordValid) {
            // return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            console.log("password incorrect")
        }

        // Si tout est correct, retourner les informations de l'utilisateur
        const { mot_de_passe: _, ...userWithoutPassword } = user; // Ne pas retourner le mot de passe
        res.status(200).json({ message: 'Connexion réussie!', user: userWithoutPassword });
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


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
