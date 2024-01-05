import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    type: {
        type:String,
        default:'Text'
    },
    message: {
      type: String,
      trim:true
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Message", messageSchema);
