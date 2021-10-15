import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/default";
import { generatePassword } from "../functions/default";
import { IAdmin } from "../interfaces/adminInterfaces";

const adminSchema = new Schema({
  name: {
    type: String,
    default: `Admin${Math.floor(Math.random() * 10000)}`,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  profilePic: {
    type: String,
  },
  password: {
    type: String,
    require: true,
    default: generatePassword(),
    select: false,
  },
  twoStepVerification: {
    type: Boolean,
    require: true,
    default: false,
  },
  role: {
    type: String,
    require: true,
    default: "ADMIN",
  },
  accountStatus: {
    status: {
      type: String,
      required: true,
    },
    blockedType: {
      type: String,
    },
    blockedUntil: {
      type: Date,
    },
    blockedreason: {
      type: Array,
      required: true,
      default: [],
    },
    blockedCount: {
      type: Number,
    },
  },

  accountDetails: {
    lastPasswords: {
      type: String,
      select: false,
    },
    resetPasswdAccess: {
      type: Boolean,
      required: false,
      default: false,
    },
    resetPasswdAttempt: {
      type: Number,
    },
    lastResetPasswd: {
      type: String,
    },
  },

  accountLogs: {
    createdAt: {
      type: String,
      required: true,
      default: new Date().toLocaleString(),
    },
    lastSync: {
      type: String,
      required: true,
      default: new Date().toLocaleString(),
    },
    currentIP: {
      type: String,
    },
  },
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.matchPasswords = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const Admin = mongoose.model<IAdmin>("Admins", adminSchema);

export default Admin;
