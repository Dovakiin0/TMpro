import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  token?: string;
  otp: number | null;
  otpExpiration: Date | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export type OmitedUser = Omit<IUser, "password">;
