const courses = require("./courses.json");

module.exports = (app) => {
  console.log("Courses module ready");

  app.get("/api/adv", (req, res) => {
    const advId = req.query.advId;
    console.log(advId);
    courses["courses"].forEach((adv) => {
      if (adv.key === advId) {
        res.json(adv);
      }
    });
    // res.json(courses["courses"].find( adv  => adv.key === advId));
  });

  app.get("/api/explore", (req, res) => {
    res.send(courses["courses"]);
  });
};
