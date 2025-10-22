//dprRoute.js
import DPR from "../models/dprModel.js";
import express from "express";

const router = express.Router();

//Route for create DPR
router.post("/", async (req, res) => {
  try {
    const {
      taskId,
      reportDate,
      shift,
      manpower,
      progress,
      remarks,
      safetyIssues,
      attachments,
      submittedBy,
    } = req.body;
    if (!taskId || !reportDate || !shift) {
      return res
        .status(400)
        .send({ message: "Task ID, Report Date and Shift are required" });
    }

    const newDPR = {
      taskId,
      reportDate,
      shift,
      manpower: manpower || 0,
      progress: progress || 0,
      remarks: remarks || "",
      safetyIssues: safetyIssues || "",
      attachments: attachments || [],
      submittedBy: submittedBy || null,
    };
    const dpr = await DPR.create(newDPR);
    res.status(200).send(dpr);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "DPR creation failed!" });
  }
});

export default router;
