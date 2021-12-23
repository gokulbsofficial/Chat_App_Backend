import mongoose, { Schema } from "mongoose";

const inboxSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  conversationId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:"Conversations"
  },
  lastMsg: { type: Object, default: {} },
  pinned: {
    type: Boolean,
    required: true,
    default: false,
  },
  muted: {
    type: Boolean,
    required: true,
    default: false,
  },
  seen: {
    type: Boolean,
    required: true,
    default: false,
  },
  unseen: {
    type: Number,
    required: true,
    default: 0,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("inboxes", inboxSchema);
