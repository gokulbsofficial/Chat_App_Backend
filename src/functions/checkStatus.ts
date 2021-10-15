import { Document } from "mongoose";
import { IAdmin } from "../interfaces/adminInterfaces";
import { IUser } from "../interfaces/userInterfaces";

const checkStatus = (
  Model: (IUser & Document) | (IAdmin & Document),
  check: string[]
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { status, blockedType, blockedUntil } = Model.accountStatus;

      if (Model) {
        if (check.includes("Blocked") && status === "Blocked") {
          if (blockedType === "Permanently") {
            return reject({
              message: "Your account is Permanently blocked",
            });
          } else if (blockedType === "Temporarily" && blockedUntil) {
            if (blockedUntil.getTime() <= new Date().getTime()) {
              Model.accountStatus.status = "Active";
              Model.accountStatus.blockedUntil = null;
              Model.accountStatus.blockedType = null;
              Model.save();
            } else {
              return reject({
                message: `Your account is Temporarily blocked upto ${blockedUntil.toLocaleString()}`,
              });
            }
          } else {
            return reject({
              message: "Your account is blocked",
            });
          }
        }

        if (check.includes("Inactive") && status === "Inactive") {
          return reject({
            message: "Your account is inactive, active your account and login",
          });
        }

        if (check.includes("Active") && status === "Active") {
          return reject({
            message: "Your account already active, do login",
          });
        }
        return resolve(true);
      } else {
        throw new Error("Server Error");
      }
    } catch (error: any) {
      reject({ message: error.message || error.msg, code: error.code });
    }
  });
};
export default checkStatus;
