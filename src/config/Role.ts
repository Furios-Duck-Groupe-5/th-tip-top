import mongoose, { Document, Schema } from "mongoose";

interface IRole extends Document {
  status: boolean;
  libelle: string;
}

const RoleSchema: Schema = new Schema({
  status: { type: Boolean, default: true },
  libelle: { type: String, required: true },
});

// Clé primaire : id (générée automatiquement par MongoDB)
const Role = mongoose.model<IRole>("Role", RoleSchema);
export default Role;
