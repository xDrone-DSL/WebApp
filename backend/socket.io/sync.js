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

    socket.on("REJECT1", () => {
      console.log("REJECT1");
      state.queue.shift(1);
      io.emit("UPDATE", state);
    });

    socket.on("REJECT2", () => {
      console.log("REJECT2");
      state.queue.shift(1);
      io.emit("UPDATE", state);
    });

    socket.on("REQUESTFLIGHT", data => {
      data["hide"] = false;
      state.queue.push(data);
      io.emit("UPDATE", state);
    });
  });
};
