import mongoose, { Document, Schema } from "mongoose";

interface ILot extends Document {
  description: string;
  valeur: number; // Notez que j'ai corrigé "vaeur" en "valeur"
}

const LotSchema: Schema = new Schema({
  description: { type: String, required: true },
  valeur: { type: Number, required: true },
});

// Clé primaire : id_lot (générée automatiquement par MongoDB)
const Lot = mongoose.model<ILot>("Lot", LotSchema);
export default Lot;
