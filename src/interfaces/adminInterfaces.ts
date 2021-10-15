import {
  IAccountDetails,
  IAccountLogs,
  IAccountStatus,
} from "./authInterfaces";

export interface IAdmin extends Document {
  name: string;
  email: string;
  profilePic?: string | null;
  password: string;
  mobile: number;
  role: "ADMIN" | "SUPER_ADMIN";
  twoStepVerification: boolean;
  accountStatus: IAccountStatus;
  accountDetails: IAccountDetails;
  accountLogs: IAccountLogs;
}
