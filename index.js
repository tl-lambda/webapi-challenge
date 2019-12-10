const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");

server.use(express.json());
server.use(helmet());
server.use(cors());

const projectRoutes = require("./Routes/projectRoutes");
const actionRoutes = require("./Routes/actionRoutes");

server.use("/projects", projectRoutes);
server.use("/actions", actionRoutes);

server.listen(3000, () => {
  console.log("listening on port 3000");
});
