const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config({ path: ".env.local" });

const app = express();
const port = 8080;

app.use(bodyParser.json());

if (process.env.MODE === "dev") {
  const cors = require("cors");
  app.use(cors());
}

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

const io = require("socket.io")(server);

// COURSES
const courses = require("./courses/courses.js")(app);

// DRONE
const drone = require("./drone/drone.js")(app);

app.use("/", express.static(path.resolve("../dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("../dist/index.html"));
});

const sync = require("./socket.io/sync.js")(io);
