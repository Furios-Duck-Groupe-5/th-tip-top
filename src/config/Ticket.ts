import mongoose, { Document, Schema } from "mongoose";

interface ITicket extends Document {
  code_ticket: string;
  date_validation: Date;
  id_user: mongoose.Types.ObjectId; // Clé étrangère vers User
  remis: boolean;
  status: boolean;
}

const TicketSchema: Schema = new Schema({
  code_ticket: { type: String, required: true },
  date_validation: { type: Date, required: true },
  id_user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Clé étrangère
  remis: { type: Boolean, default: false },
  status: { type: Boolean, default: true },
});

// Clé primaire : id_ticket (générée automatiquement par MongoDB)
const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);
export default Ticket;
