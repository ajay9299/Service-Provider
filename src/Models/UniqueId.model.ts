import { model, Schema, Document,Types } from "mongoose";

export interface Uuid {
  Uuid: string;
  userId: number;
}

export interface UuidModel extends Uuid, Document {}

const uuidSchema = new Schema({
    Uuid: { type: String, required: true, unique: true },
    userId: { type: Types.ObjectId, ref:'User',required: true },
});

export default model<UuidModel>("uniqueId", uuidSchema);
