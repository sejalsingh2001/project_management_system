import express from "express";

import {
  getProjects,
  createProject,
  getProject,
  deleteProject,
  updateProject,
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} from "../controllers/projects.js";
const router = express.Router();

router.get("/projects", getProjects);
router.post("/project", createProject);
router.get("/project/:id", getProject);
router.delete("/project/:id", deleteProject);
router.put("/project/:id", updateProject);

router.get("/tasks", getTasks);
router.post("/task", createTask);
router.get("/task/:id", getTask);
router.delete("/task", deleteTask);
router.put("/task", updateTask);
export default router;
