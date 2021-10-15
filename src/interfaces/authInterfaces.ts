export interface IAccountStatus {
  status: "Inactive" | "Active" | "Blocked";
  blockedType?: "Permanently" | "Temporarily" | null;
  blockedUntil?: Date | null;
  blockedreason: string[];
  blockedCount?: number;
}

export interface IAccountDetails {
  accountType: "New Account" | "Old Account";
  resetPasswdAccess: boolean;
  lastPassword?: string;
  lastResetPasswd?: Date;
  resetPasswdAttempt?: number;
}

export interface IAccountLogs {
  createdAt: Date;
  lastSync?: Date;
  currentIP?: string;
  usededIP?: string[];
}

export interface IAdminLogin {
  email: string;
  password: string;
}

export interface IAdminLoginResponse {
  message: string;
  twoStepVerification: boolean;
  mobile: string;
  email: string;
  token: string | null;
}

export interface ISentOtp {
  mobile: string;
  channel: "sms" | "call";
}

export interface ISentOtpResponse {
  message: string;
  sid: string;
}

export interface IVerifyOtp {
  mobile: string;
  code: string;
}

export interface IVerifyOtpResponse {
  message: string;
  verified: boolean;
}

export interface ILoginResponse {
  data: {
    message: string;
    twoStepVerification?: boolean;
    token?: string;
  };
}

export interface ILoginProfile {
  name: string;
  userName: string;
  mobile: string;
  profilePic?: string;
}

export interface ICloudPassword {
  mobile: string;
  password: string;
}

export interface ICloudPasswdResponse {
  message: string;
  verified: boolean;
}
