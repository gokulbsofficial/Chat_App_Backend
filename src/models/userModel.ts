import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/default";
import { IUser } from "../interfaces/userInterfaces";
import { generateId, generatePassword } from "../functions/default";

const userSchema = new Schema({
  name: {
    type: String,
    default: `User${Math.floor(Math.random() * 10000)}`,
  },
  userName: {
    type: String,
    lowercase: true,
    default: generateId(),
    unique: true,
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
  userStatus: {
    type: String,
    require: true,
    default: "offline",
  },
  profilePic: {
    type: String,
  },
  userAbout: {
    type: String,
    require: true,
    default: `Hey there! I am using ChatApp`,
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
    default: "USER",
  },
  accountStatus: {
    status: {
      type: String,
      required: true,
      default: "Inactive",
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

const User = mongoose.model<IUser>("Users", userSchema);

export default User;
