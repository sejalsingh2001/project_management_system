import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import projectRoutes from "./routes/projects.js";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/", projectRoutes);

app.get("/", (req, res) => res.send("Hello From Express"));
app.all("*", (req, res) => res.send("That routes doesn't exist"));

app.listen(port, () =>
  console.log(`server is listening on port: http://localhost:${port}`)
);
