import type { NextFunction, Response } from "express";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import { generateJWT } from "../helper/jwt";
import { IRequest } from "../types/IRequest";

/* 
 @Desc Get all users
 @Route /api/auth
 @Method GET
 */
const getAll = asyncHandler(async (req: IRequest, res: Response) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({ count: users.length, users });
});

const getMe = asyncHandler(async (req: IRequest, res: Response) => {
  res.status(200).json(req.user);
});

/* 
 @Desc Login 
 @Route /api/auth/
 @Method POST
 */
const login = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("Email or password is incorrect");
    }

    if (await user.comparePassword(password)) {
      const expireDate = 7 * 24 * 60 * 60 * 1000; // 7 days

      res
        .status(200)
        .cookie("access_token", generateJWT(user._id), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expires: new Date(Date.now() + expireDate),
        })
        .json({
          success: true,
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
          },
        });
    } else {
      res.status(401);
      throw new Error("Email or password incorrect");
    }
  },
);

/* 
  @Desc Register new User
  @Route /api/auth/register
  @Method POST
*/
const registerUser = asyncHandler(async (req: IRequest, res: Response) => {
  const { email, username, password } = req.body;

  const user = new User({
    email,
    username,
    password,
  });

  await user.save();

  const expireDate = 7 * 24 * 60 * 60 * 1000; // 7 days

  res
    .status(201)
    .cookie("access_token", generateJWT(user._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + expireDate),
    })
    .json({
      success: true,
      user: {
        email: user.email,
        fullName: user.username,
      },
    });
});

const logout = asyncHandler(async (req: IRequest, res: Response) => {
  res.clearCookie("access_token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

export { registerUser, login, getAll, logout, getMe };
