//projectRoute.js

import { Project } from "../models/projectModel.js";
import express from "express";

const router = express.Router();

//Route for create project
router.post("/", async (req, res) => {
  try {
    const { name, startDate, endDate, members } = req.body;
    if (!name || !startDate || !endDate) {
      return res
        .status(400)
        .send({ message: "Name, Start Date and End Date are required" });
    }
    const existedProject = await Project.findOne({ name });
    if (existedProject) {
      return res.status(400).send({ message: "Project name already exists" });
    }

    const newProject = {
      name,
      startDate,
      endDate,
      members: members || [],
    };
    const project = await Project.create(newProject);
    res.status(200).send(project);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Project creation failed!" });
  }
});

//Route for get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate({
      path: "members",
      select: "-password -canLogin",
    });
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Router for get project detail
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate({
      path: "members",
      select: "-password -canLogin",
    });
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Router for update project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startDate, endDate, status, members } = req.body;

    if (!name || !startDate || !endDate) {
      return res
        .status(400)
        .send({ message: "Name, Start Date and End Date are required" });
    }

    const allowedStatuses = ["planned", "ongoing", "completed"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).send({ message: "Invalid status value" });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { name, startDate, endDate, status, members },
      { new: true }
    ).populate({
      path: "members",
      select: "-password -canLogin",
    });

    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Router for delete project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Project.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Project not found" });
    }
    res.status(200).send({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
