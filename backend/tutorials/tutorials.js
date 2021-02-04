const tutorials = require("./tutorials.json");

module.exports = app => {
    console.log("Tutorials module ready");

    app.get("/api/tutorials", (req, res) => {
        res.send(tutorials["tutorials"].map(tut => {
            return {id: tut.id, title: tut.title}
        }));
    });

    app.get("/api/tutorial", (req, res) => {
        const tutorialId = req.query.tutorialId;
        res.send(tutorials["tutorials"].find(tut => tut.id === tutorialId));
    });
};
