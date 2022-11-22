import { model, Schema, Document } from "mongoose";

export interface IRole {
  name: string;
  roleId: number;
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  roleId: { type: Number, required: true, unique: true },
});

export default model<IRoleModel>("Role", RoleSchema);
