import type { Response } from "express";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import { generateJWT } from "../helper/jwt";
import { IRequest } from "../types/IRequest";
import { generateOTP } from "../helper/util";
import { sendEmail } from "../helper/mailer";

/* 
 @Desc Get all users
 @Route /api/auth
 @Method GET
 */
const getAll = asyncHandler(async (_: IRequest, res: Response) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({ count: users.length, users });
});

/* 
 @Desc Get current logged in user
 @Route /api/auth/@me
 @Method GET
 */
const getMe = asyncHandler(async (req: IRequest, res: Response) => {
  res.status(200).json(req.user);
});

/* 
 @Desc Login 
 @Route /api/auth/
 @Method POST
 */
const login = asyncHandler(async (req: IRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Email or password is incorrect");
  }

  if (!user.isVerified) {
    res.status(400);
    throw new Error("Please verify your email");
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
});

/* 
  @Desc Register new User
  @Route /api/auth/register
  @Method POST
*/
const registerUser = asyncHandler(async (req: IRequest, res: Response) => {
  const { email, username, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error("User already exists");
  }

  const user = new User({
    email,
    username,
    password,
  });

  await user.save();

  res.status(201).json({
    success: true,
    user: {
      _id: user._id,
      email: user.email,
    },
  });
});

/* 
  @Desc Generates new otp for the user
  @Route /api/auth/otp
  @Method POST
*/
const generateOtpForUser = asyncHandler(
  async (req: IRequest, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User does not exists");
    }

    const otpExpirationTimeStamp = new Date();
    otpExpirationTimeStamp.setMinutes(otpExpirationTimeStamp.getMinutes() + 15); // 15 minutes

    const generatedOTP = generateOTP(); // generate a new OTP

    user.otp = generatedOTP;
    user.otpExpiration = otpExpirationTimeStamp;

    await user.save();

    // send OTP to the user email address
    sendEmail({
      to: user.email,
      subject: "Verification Code",
      template: "main",
      context: {
        username: user.username,
        otp: generatedOTP.toString(),
      },
    });

    res.status(200).json({
      success: true,
      message: "OTP has been sent to your email address",
    });
  },
);

/* 
  @Desc Gets OTP to verify user account
  @Route /api/auth/otp/verify
  @Method POST
*/
const verifyOTP = asyncHandler(async (req: IRequest, res: Response) => {
  const { otp, email } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.otp || !user.otpExpiration) {
    res.status(400);
    throw new Error("User does not exists"); // User not found or OTP information missing
  }

  const currentTimeStamp = new Date();

  if (user.otp !== otp && currentTimeStamp > user.otpExpiration) {
    res.status(400);
    throw new Error("Your otp has been expired");
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiration = null;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Account verified, Please login!" });
});

/* 
  @Desc Clears the cookie and logs out the user
  @Route /api/auth/logout
  @Method POST
*/
const logout = asyncHandler(async (req: IRequest, res: Response) => {
  res.clearCookie("access_token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

export {
  registerUser,
  login,
  getAll,
  logout,
  getMe,
  verifyOTP,
  generateOtpForUser,
};
