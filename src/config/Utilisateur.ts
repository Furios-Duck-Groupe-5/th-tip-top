import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  role_id: mongoose.Types.ObjectId; // Clé étrangère vers Role
  date_de_naissance?: Date; // Optionnel
  sexe?: string; // Optionnel
  status: boolean;
}

const UserSchema: Schema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  role_id: { type: Schema.Types.ObjectId, ref: "Role", required: true }, // Clé étrangère
  date_de_naissance: { type: Date },
  sexe: { type: String },
  status: { type: Boolean, default: true },
});

// Clé primaire : id_user (générée automatiquement par MongoDB)
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
