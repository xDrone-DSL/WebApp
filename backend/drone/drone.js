const axios = require("axios");

// Set to 0.0.0.0 when both the WebApp and Flask server
// are running on the some machine
const FLASK_HOST

if (process.env.MODE === "dev") {
  FLASK_HOST = "http://0.0.0.0:8081";
} else {
  FLASK_HOST = "http://10.5.0.5:8081";
}

module.exports = app => {
  console.log("Drone module ready");

  app.post("/api/fly", (req, res) => {
    axios
      .post(`${FLASK_HOST}/fly`, {
        body: req.body
      })
      .then(res.send("Drone flew"));
  });

  app.post("/api/simulate", (req, res) => {
    axios
      .post(`${FLASK_HOST}/simulate`, {
        body: req.body
      })
      .then(response => {
        res.send(response.data);
      });
  });
};
