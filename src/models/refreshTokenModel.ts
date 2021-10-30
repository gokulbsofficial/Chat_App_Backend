import mongoose, { Schema } from "mongoose";

const refreshTokenModel = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user"
        },
        refreshToken: {
            type: String,
            required: true
        },
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: 60 * 60 * 24 }
        }
    }
)

export default mongoose.model("refresh-tokens", refreshTokenModel);
