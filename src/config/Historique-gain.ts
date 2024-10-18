import mongoose, { Document, Schema } from "mongoose";

interface IHistoriqueGain extends Document {
  date_gain: Date;
  id_lot: mongoose.Types.ObjectId; // Clé étrangère vers Lot
  id_user: mongoose.Types.ObjectId; // Clé étrangère vers User
}

const HistoriqueGainSchema: Schema = new Schema({
  date_gain: { type: Date, required: true },
  id_lot: { type: Schema.Types.ObjectId, ref: "Lot", required: true }, // Clé étrangère
  id_user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Clé étrangère
});

// Clé primaire : id_historique (générée automatiquement par MongoDB)
const HistoriqueGain = mongoose.model<IHistoriqueGain>("HistoriqueGain", HistoriqueGainSchema);
export default HistoriqueGain;
