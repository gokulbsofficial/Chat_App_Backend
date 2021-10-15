import { Document } from "mongoose";
import {
  IAccountDetails,
  IAccountLogs,
  IAccountStatus,
} from "./authInterfaces";

export interface IUser extends Document {
  name: string;
  userName: string;
  mobile: number;
  email?: string;
  userStatus?: string;
  profilePic?: string;
  password?: string;
  role?: "USER";
  twoStepVerification: boolean;
  accountStatus: IAccountStatus;
  accountDetails: IAccountDetails;
  accountLogs: IAccountLogs;
}

// export interface ISeller extends Document {
//   name: string;
//   email: string;
//   profile?: string | null;
//   password?: string;
//   mobile?: number | null;
//   role?: "SELLER";
//   twoStepVerification?: boolean;
//   rating?: number;
//   accountCompanyDetails?: {
//     brandName: string;
//     CEO: string;
//     since: string;
//   };
//   accountStatus: IAccountStatus;
//   accountDetails: IAccountDetails;
//   accountLogs: IAccountLogs;
// }
