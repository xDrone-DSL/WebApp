var state = require("./state.json");

module.exports = io => {
  console.log("Sync module ready");

  io.on("connection", function(socket) {
    console.log(socket.id);
    io.emit("UPDATE", state);

    socket.on("APPROVE", () => {
      console.log("APPROVE");
      state.queue.shift(1);
      io.emit("UPDATE", state);
    });
  });
};
