//dprModel.js
import mongoose from "mongoose";

const dprSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    reportDate: {
      type: Date,
      required: true,
    },
    shift: {
      type: String,
      enum: ["morning", "evening", "night"],
      default: "morning",
      required: true,
    },
    manpower: {
      type: Number,
    },
    progress: {
      type: Number,
    },
    remarks: {
      type: String,
    },
    safetyIssues: {
      type: String,
    },
    attachments: [
      {
        type: String, // file URLs
      },
    ],
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const DPR = mongoose.model("DPR", dprSchema);

export default DPR;
