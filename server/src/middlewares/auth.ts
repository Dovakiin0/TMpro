import type { Response, NextFunction } from "express";
import { verifyJWT } from "../helper/jwt";
import User from "../models/User";
import { IRequest } from "../types/IRequest";

export const isAuth = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  // let token = req.cookies["access_token"];
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = verifyJWT(token);

    if (!decoded.id) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    req.user = user;

    next();
  }
};
