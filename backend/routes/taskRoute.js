//taskRoute.js

import { Task } from "../models/taskModel.js";
import express from "express";
import { sendEmail } from "../utills/sendEmail.js";

const router = express.Router();

//Route for create task
router.post("/", async (req, res) => {
  try {
    const { projectId, name, type, startDate, endDate, assignedTo, status } =
      req.body;
    if (!projectId || !name) {
      return res
        .status(400)
        .send({ message: "Project ID and Name are required" });
    }

    const newTask = {
      projectId,
      name,
      type: type || "",
      startDate: startDate || null,
      endDate: endDate || null,
      assignedTo: assignedTo || null,
      status: status || "pending",
    };
    const task = await Task.create(newTask);
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Task creation failed!" });
  }
});

//Route for get all tasks
router.get("/", async (_req, res) => {
  try {
    const tasks = await Task.find().populate({
      path: "projectId",
      populate: { path: "members" },
    });
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Fetching tasks failed!" });
  }
});

//Router for get task detail
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate({
      path: "projectId",
      populate: { path: "members" },
    });
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Fetching task failed!" });
  }
});

//Router for update task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, startDate, endDate, projectId, assignedTo, status } =
      req.body;

    if (!name || !projectId) {
      return res
        .status(400)
        .send({ message: "Name and Project ID are required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        name,
        type,
        startDate,
        endDate,
        assignedTo,
        status,
        updatedAt: Date.now(),
      },
      { new: true }
    ).populate("assignedTo");

    // Check if status actually changed
    if (updatedTask.status !== "pending") {
      updatedTask.status = status;
      await updatedTask.save();

      // Send Email Notification if assignedTo user exists and has email
      if (updatedTask.assignedTo && updatedTask.assignedTo.email) {
        const subject = `Task Status Updated: ${updatedTask.name}`;
        const message = `Hello,\n\nThe status of your task "${updatedTask.name}" has been updated to "${status}".\n\n-Best Regards,\nManagement Team`;

        await sendEmail(updatedTask.assignedTo.email, subject, message);
      }
    }

    res.status(200).send(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Updating task failed!" });
  }
});

//Router for delete task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Deleting task failed!" });
  }
});

export default router;
