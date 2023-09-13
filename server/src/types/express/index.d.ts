import { OmitedUser } from "../IUser";

declare global {
  namespace Express {
    export interface Request {
      user?: OmitedUser;
    }
  }
}
