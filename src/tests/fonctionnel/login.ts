// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { pool } from '../../backend';

// interface LoginResponse {
//   message: string;
//   user?: object;
//   token?: string;
//   roleId?: number;
// }

// export const login = async (email: string, mot_de_passe: string): Promise<LoginResponse> => {
//   // Vérifie que l'email et le mot de passe sont fournis
//   if (!email || !mot_de_passe) {
//     return { message: 'Email et mot de passe sont requis.' };
//   }

//   try {
//     const result = await pool.query('SELECT * FROM Utilisateur WHERE email = $1', [email]);

//     // Si aucun utilisateur n'est trouvé, retourne une erreur
//     if (result.rows.length === 0) {
//       return { message: 'Email ou mot de passe incorrect.' };
//     }

//     const user = result.rows[0];

//     // Vérifie que le mot de passe est correct
//     const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
//     if (!isPasswordValid) {
//       return { message: 'Email ou mot de passe incorrect.' };
//     }

//     // Crée un jeton JWT avec les informations de l'utilisateur
//     const payload = {
//       userId: user.id_user,
//       roleId: user.role_id
//     };
//     const secretKey = process.env.JWT_SECRET_KEY || 'Ki0Ka7E8/LINCNrVraSKs6bRL+U4qfP5U80LryzBEAs=';
//     const token = jwt.sign(payload, secretKey, { expiresIn: '356d' });

//     const { mot_de_passe: _, ...userWithoutPassword } = user;

//     return {
//       message: 'Connexion réussie!',
//       user: userWithoutPassword,
//       token,
//       roleId: user.role_id
//     };
//   } catch (error) {
//     console.error('Erreur lors de la connexion :', error);
//     return { message: 'Erreur lors de la connexion.' };
//   }
// };
