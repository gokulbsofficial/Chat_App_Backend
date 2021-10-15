import checkStatus from "../functions/checkStatus";
import { generateJwtToken } from "../functions/jwt";
import { IAdminLoginResponse } from "../interfaces/authInterfaces";
import Admin from "../models/adminModel";

export const adminLogin = (email: string, password: string) => {
  return new Promise<IAdminLoginResponse>(async (resolve, reject) => {
    if (!email || !password)
      return reject({ msg: "Make sure u entered email, password" });
    try {
      const adminFound = await Admin.findOne({ email });

      if (adminFound) {
        const admin = adminFound;

        if (admin.role === "ADMIN") {
          await checkStatus(adminFound, ["Blocked", "Inactive"]);
        }

        if (admin.role === "ADMIN" || admin.role === "SUPER_ADMIN") {
          //   const isMatch = await bcrypt.compare(
          //     password,
          //     admin.password ?? "password"
          //   );
          let isMatch = false;
          if (isMatch) {
            adminFound.accountLogs.lastSync = new Date();

            await adminFound.save();

            let accessToken = null;

            if (!admin.twoStepVerification) {
              accessToken = await generateJwtToken(
                { adminId: admin._id, email: admin.email },
                "ACCESS_TOKEN"
              );
            }

            return resolve({
              message: "Login Successfully",
              twoStepVerification: admin.twoStepVerification,
              mobile: admin.mobile.toString(),
              email: admin.email,
              token: accessToken,
            });
          } else {
            return reject({ message: "Incorrect credentials" });
          }
        } else {
          return reject({ message: "You did not have a permition to login" });
        }
      } else {
        return reject({ message: "Incorrect email" });
      }
    } catch (error: any) {
      reject({
        message: error.message || error.msg,
        code: error.code || error.name,
      });
    }
  });
};
