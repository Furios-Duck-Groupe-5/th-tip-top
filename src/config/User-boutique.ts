import mongoose, { Document, Schema } from "mongoose";

interface IUserBoutique extends Document {
  id_user: mongoose.Types.ObjectId; // Clé étrangère vers User
  id_boutique: mongoose.Types.ObjectId; // Clé étrangère vers Boutique
}

const UserBoutiqueSchema: Schema = new Schema({
  id_user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Clé étrangère
  id_boutique: { type: Schema.Types.ObjectId, ref: "Boutique", required: true }, // Clé étrangère
});

// Clé primaire : id_user_boutique (générée automatiquement par MongoDB)
const UserBoutique = mongoose.model<IUserBoutique>("UserBoutique", UserBoutiqueSchema);
export default UserBoutique;
