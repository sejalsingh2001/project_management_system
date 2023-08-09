import { v4 as uuid } from "uuid";

let projects = [
  {
    name: "Test",
    id: "1234",
  },
];
let tasks = [
  {
    projectId: "1234",
    taskId: "12345",
    taskName: "Test",
  },
  {
    projectId: "1234",
    taskId: "123456",
    taskName: "Test2",
  },
];

export const getProjects = (req, res) => {
  res.send(projects);
};

export const createProject = (req, res) => {
  const project = req.body;

  projects.push({ ...project, id: uuid() });
  res.send("Project Added Successfully");
};

export const getProject = (req, res) => {
  const singleProject = projects.filter(
    (project) => project.id === req.params.id
  );
  res.send(singleProject);
};

export const deleteProject = (req, res) => {
  projects = projects.filter((project) => project.id !== req.params.id);
  res.send("Project Deleted Successfully");
};

export const updateProject = (req, res) => {
  const project = project.find((project) => project.id === req.params.id);
  project.name = req.body.name;
  project.email = req.body.email;

  res.send("Project Updated Successfully");
};

export const getTasks = (req, res) => {
  const projectId = req.query.id;
  let task = [];
  task = tasks.filter((task) => task.projectId == projectId);
  res.send(task);
};

export const createTask = (req, res) => {
  const projectId = req.body.projectId;
  let task = {
    projectId: projectId,
    taskId: uuid(),
    taskName: req.body.name,
  };
  tasks.push(task);
  res.send("Task Added Successfully");
};

export const getTask = (req, res) => {
  const singleTask = tasks.filter((task) => task.id === req.params.id);
  res.send(singleTask);
};

export const deleteTask = (req, res) => {
  console.log(req.query.task_id);
  tasks = tasks.filter((task) => task.taskId !== req.query.task_id);
  res.send("Task Deleted Successfully");
};

export const updateTask = (req, res) => {
  console.log(req.body.taskId);
  const task = tasks.findIndex((task) => task.taskId === req.body.taskId);
  console.log(task);
  tasks[task].taskName = req.body.taskName;

  res.send("Task Updated Successfully");
};
