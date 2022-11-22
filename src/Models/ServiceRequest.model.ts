import { model, Document, Schema, Types, ObjectId } from "mongoose";

export interface IServiceRequest {
  from: ObjectId;
  to: ObjectId;
  providerServiceId: String;
  status: String[];
  desc: String;
}

export interface IServiceRequestModel extends IServiceRequest, Document {}

const ServiceRequestModel = new Schema(
  {
    from: { type: Types.ObjectId, ref: "User", require: true }, // Consumer Id
    to: { type: Types.ObjectId, ref: "User", require: true }, // Provider Id
    providerServiceId: { type: Types.ObjectId, ref: "Provider", require: true }, // Service Id
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
    },
    desc: { type: String, default: null },
  },
  { timestamps: true, versionKey: false }
);

export default model<IServiceRequestModel>(
  "ServiceRequest",
  ServiceRequestModel
);
