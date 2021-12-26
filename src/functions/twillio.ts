import config from "../config/default";
import twilio from "twilio";
import { VerificationInstance } from "twilio/lib/rest/verify/v2/service/verification";
import {
  ISentOtpResponse,
  IVerifyOtpResponse,
} from "../interfaces/authInterfaces";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_ID } =
  config.TWILIO;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sentOtp = (mobile: string, channel: "sms" | "call") => {
  return new Promise<ISentOtpResponse>((resolve, reject) => {
    console.log(mobile)
    client.verify
      .services(TWILIO_SERVICE_ID)
      .verifications.create({
        to: `+${mobile}`,
        channel: `${channel ?? "sms"}`,
      })
      .then(async (verification: VerificationInstance) => {
        resolve({ message: `OTP sented to +${mobile}`, sid: verification.sid });
      })
      .catch((error: any) => {
        reject({ message: error.message, code: error.code });
      });
  });
};

export const verifyOtp = (mobile: string, code: string) => {
  return new Promise<IVerifyOtpResponse>((resolve, reject) => {
    client.verify
      .services(TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: `+${mobile}`, code: code ?? "12345" })
      .then(async (verification_check) => {
        if (verification_check.valid) {
          resolve({
            message: "OTP verified",
            verified: verification_check.valid,
          });
        } else {
          reject({
            msg: `Please provide an mobile and OTP code`,
          });
        }
      })
      .catch(async (error: any) => {
        reject({
          msg: error.message,
          code: error.code,
        });
      });
  });
};
