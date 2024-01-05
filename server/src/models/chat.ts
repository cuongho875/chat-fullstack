import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var chatSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/9790/9790561.png",
    },
    chatName: {
      type: String,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Chat", chatSchema);
