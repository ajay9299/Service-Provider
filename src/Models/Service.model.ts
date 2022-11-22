import { model, Schema, Document } from "mongoose";

export interface IService {
  title: string;
  isActivate: boolean;
  numberOfVender: number;
  image: string;
  desc: string;
}

export interface IServiceModel extends IService, Document {}

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true }, // name of service
    isActivate: { type: Boolean, default: true }, // Status of service
    numberOfVender: { type: Number, default: 0 }, // total number of service provider of this type of service
    image: { type: Buffer, default: null },
    desc: { type: String, default: null }, // Description of service
  },
  { timestamps: true, versionKey: false }
);

export default model<IServiceModel>("Service", ServiceSchema);
