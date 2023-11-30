import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    visibility: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    severity: {
        type: Number,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
  },
  {
    timestamps: true,
  }
);

var serverMessageModel = mongoose.model("serverMessages", postSchema);
export default serverMessageModel;
