import mongoose from "mongoose";
import { IUser } from "../types/IUser";
import { comparePwd, hashPassword } from "../helper/jwt";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  user.password = hashPassword(user.password);
  return next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  const user = this as IUser;
  return comparePwd(password, user.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
