import mongoose, { Schema } from "mongoose";

const messageScheme = new Schema({
  authorId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  type: {
    type: String,
    required: true,
    default: "text-msg",
  },

  message: {
    type: String,
  },

  filePath: {
    type: String,
  },

  fileName: {
    type: String,
  },

  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },

  deletedUserId: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],

  timestamp: {
    type: String,
    required: true,
  },
});

const conversationSchema = new Schema(
  {
    groupId: {
      type: mongoose.Types.ObjectId,
    },
    participants: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    ],
    roles: {
      type:Object
    },
    messages: [messageScheme],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversations", conversationSchema);
