import { model, Schema, Document } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: number;
  password: string;
  isEmailVerified: boolean;
  isProfileCompleted: boolean;
  address: {
    pinCode: string;
    houseNumber: string;
    city: string;
    state: string;
  };
  userPhoto: string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true, trim: true },
    phoneNumber: {
      type: String,
      default: null,
      trim: true,
    },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    role: {
      type: Number,
      default: 3,
      // 1 indicates admin, 2 for provider, 3 for consumer
      enum: [1, 2, 3],
      required: true,
    },
    acceptTerms: { type: Boolean, required: true },
    isEmailVerified: { type: Boolean, default: false },
    password: { type: String, required: true, trim: true },
    isProfileCompleted: { type: Boolean, default: false },
    address: {
      pinCode: { type: String, default: null, trim: true },
      houseNumber: { type: String, default: null, trim: true },
      city: { type: String, default: null, trim: true },
      state: { type: String, default: null, trim: true },
    },
    userPhoto: { type: Buffer, default: null },
    resetPasswordToken: {
      type: String,
      required: false,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model<IUserModel>("User", UserSchema);
