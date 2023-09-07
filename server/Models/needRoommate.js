import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    rank: {
      type: Number,
      required: true
    },
    gender: String,
    preferredBed: {
      type: Number,
      required: true
    },
    preferredBlock: String,
    phone: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: false
    },
    desc: String,
  },
  {
    timestamps: true,
  }
);

var needRoommateModel = mongoose.model("needRoommates", postSchema);
export default needRoommateModel;