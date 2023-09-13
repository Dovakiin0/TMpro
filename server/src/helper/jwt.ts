import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { IJWT } from "../types/IJWT";
import { ObjectId } from "mongoose";

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const generateJWT = (id: ObjectId): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const verifyJWT = (token: string): IJWT => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as IJWT;
};

export const comparePwd = (password: string, hashPwd: string): boolean => {
  return bcrypt.compareSync(password, hashPwd);
};
