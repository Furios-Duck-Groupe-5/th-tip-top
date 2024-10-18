import mongoose, { Document, Schema } from "mongoose";

interface IBoutique extends Document {
  nom: string;
  adresse: string;
  ville: string;
  pays: string;
  code_postal: string;
  email: string;
}

const BoutiqueSchema: Schema = new Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  ville: { type: String, required: true },
  pays: { type: String, required: true },
  code_postal: { type: String, required: true },
  email: { type: String, required: true },
});

// Clé primaire : id_boutique (générée automatiquement par MongoDB)
const Boutique = mongoose.model<IBoutique>("Boutique", BoutiqueSchema);
export default Boutique;
