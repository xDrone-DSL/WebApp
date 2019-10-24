const axios = require("axios");

const FLASK_HOST = "http://146.169.131.100:8081";

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
    console.log(req.body);
    axios
      .post(`${FLASK_HOST}/simulate`, {
        body: req.body
      })
      .then(respond => res.send(respond.body));
  });
};
