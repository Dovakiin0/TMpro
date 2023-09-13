import type { Response, Request, NextFunction } from "express";
import { verifyJWT } from "../helper/jwt";
import User from "../models/User";
import { OmitedUser } from "../types/IUser";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = req.cookies["access_token"];

  const decoded = verifyJWT(token);

  if (!decoded._id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  if (token !== user.token) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  req.user = user as unknown as OmitedUser;
  next();
};
