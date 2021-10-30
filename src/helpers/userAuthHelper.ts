import User from "../models/userModel";
import {
  ICloudPasswdResponse,
  ILoginProfile,
  ILoginResponse,
} from "../interfaces/authInterfaces";
import checkStatus from "../functions/checkStatus";
import { generateJwtToken, verifyJwtToken } from "../functions/jwt";
import { IAuthResponse } from "../interfaces/default";

export const doLogin = (mobile: string, verified: boolean) => {
  return new Promise<ILoginResponse>(async (resolve, reject) => {
    if (!mobile)
      return reject({
        message: `Please provide an mobile`,
      });
    try {
      const userFound = await User.findOne({ mobile: parseInt(mobile) });

      // Create New User
      if (!userFound) {
        await User.create({ mobile });

        return resolve({
          data: {
            message: `New User Created`,
          },
        });
      }

      if (userFound) {
        const { twoStepVerification } = userFound;
        const { status } = userFound.accountStatus;

        // Check Is User is Blocked
        await checkStatus(userFound, ["Blocked"]);

        // Is User is Inactive
        if (status === "Inactive") {
          return resolve({
            data: {
              message: `Create your Profile`,
            },
          });
        }

        // If User has TwoStepVerification
        if (status === "Active" && twoStepVerification === true && !verified) {
          return resolve({
            data: {
              message: `Verify Two Step Verification`,
              twoStepVerification,
            },
          });
        } else {
          // User Login
          userFound.accountLogs.lastSync = new Date();
          await userFound.save();

          const accessToken = await generateJwtToken(
            {
              userId: userFound._id,
              userName: userFound.userName,
            },
            "ACCESS_TOKEN"
          );

          return resolve({
            data: {
              message: `Login Success`,
              twoStepVerification,
              token: accessToken,
            },
          });
        }
      }
    } catch (error) {
      reject({
        message: error.message || error.msg,
        code: error.code | error.name,
      });
    }
  });
};

export const loginProfile = (data: ILoginProfile) => {
  const { name, userName, profilePic, mobile } = data;
  return new Promise<IAuthResponse>(async (resolve, reject) => {
    if (!mobile || !userName || !name) {
      return reject({
        message: `Please provide an mobile username and name`,
      });
    }
    try {
      const userFound = await User.findOne({ mobile: parseInt(mobile) });

      if (!userFound) {
        return reject({
          message: `User not found`,
        });
      }

      if (profilePic) {
        userFound.profilePic = profilePic;
      }

      userFound.name = name;
      userFound.userName = userName;
      userFound.accountLogs.lastSync = new Date();
      userFound.accountStatus.status = "Active";

      await userFound.save();

      resolve({ message: "Profile created successfully" });
    } catch (error: any) {
      reject({
        message: error.message || error.msg,
        code: error.code | error.name,
      });
    }
  });
};

export const cloudPassword = (mobile: string, password: string) => {
  return new Promise<ICloudPasswdResponse>(async (resolve, reject) => {
    try {
      if (!mobile || !password) {
        return reject({
          message: `Please provide an mobile mobile and password`,
        });
      }

      const userFound = await User.findOne({ mobile: parseInt(mobile) }).select(
        "+password"
      );

      if (!userFound) {
        return reject({
          message: `User not found`,
        });
      }

      const isMatch = await userFound.matchPasswords(userFound.password);

      if (!isMatch) {
        return reject({
          message: `Invalid Credentials`,
        });
      }

      resolve({ message: "CloudPassword Success", verified: true });
    } catch (error: any) {
      reject({
        message: error.message || error.msg,
        code: error.code | error.name,
      });
    }
  });
};

export const forgetPasswod = (email: string) => {
  return new Promise<IAuthResponse>(async (resolve, reject) => {
    try {
      if (!email) {
        return reject({
          message: `Please provide an email`,
        });
      }

      const userFound = await User.findOne({ email });

      if (!userFound) {
        return reject({
          message: `User Not Found`,
        });
      }

      userFound.accountDetails.resetPasswdAccess = true;
      userFound.save();

      const ResetToken = await generateJwtToken(
        {
          userId: userFound._id,
          userName: userFound.userName,
        },
        "RESET_TOKEN"
      );
      const URI = `${process.env.CLIENT_URL}/reset-passwd/${ResetToken}`;

      console.log(ResetToken);

      return resolve({
        message: `Sent Email Successfully ${email}`,
      });
    } catch (error: any) {
      reject({
        message: error.message || error.msg,
        code: error.code | error.name,
      });
    }
  });
};

export const resetPassword = (password: string, token: string) => {
  return new Promise<IAuthResponse>(async (resolve, reject) => {
    try {
      if (!token || !password) {
        return reject({
          message: `Please provide an token and password`,
        });
      }

      const decoded = await verifyJwtToken(token, "RESET_TOKEN");

      const userFound = await User.findOne({ _id: decoded.userId }).select(
        "+password"
      );

      if (!userFound || !userFound.accountDetails.resetPasswdAccess) {
        return reject({
          messsage: `Authentication Failed, Try again!!`,
        });
      }

      userFound.accountDetails.lastPassword = userFound.password;
      userFound.password = password;
      userFound.accountDetails.resetPasswdAccess = false;
      userFound.accountDetails.lastResetPasswd = new Date();
      userFound.accountDetails.resetPasswdAttempt =
        (userFound.accountDetails.resetPasswdAttempt ?? 0) + 1;

      userFound.save();

      return resolve({
        message: `Cloud password reset successfully`,
      });
    } catch (error: any) {
      reject({
        message: error.message || error.msg,
        code: error.code | error.name,
      });
    }
  });
};
