export interface IUser {
  _id: string;
  email: string;
  username: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  email: string;
  password: string;
  confirm_password: string;
  username: string;
}

export interface IUserResponse {
  _id: string;
  email: string;
  username: string;
}

export interface IVerifyOtp {
  otp: number;
}
