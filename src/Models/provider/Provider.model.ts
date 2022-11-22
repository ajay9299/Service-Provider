import { string } from "joi";
import { model, Schema, Document, Types, ObjectId } from "mongoose";

export interface IProvider {
  userId: ObjectId;
  categoryId: ObjectId;
  vendorName: string;
  experience: number;
  details: string;
  cost: number;
}

export interface IProviderModel extends IProvider, Document {}

const ProviderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    categoryId: {
      type: Types.ObjectId,
      ref: "Service",
      required: true,
    },
    vendorName: { type: String, required: true },
    experience: { type: Number, required: true },
    details: { type: String, required: true },
    cost: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

export default model<IProviderModel>("Provider", ProviderSchema);
