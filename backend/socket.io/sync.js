var state = require("./state.json");

module.exports = io => {
  console.log("Sync module ready");

  io.on("connection", function(socket) {
    console.log(socket.id);
    io.emit("UPDATE", state);

    socket.on("LOGIN", data => {
      id = data.id;
    });

    socket.on("APPROVE", () => {
      console.log("APPROVE");

      var mindrone = state.drones[0];
      state.drones.forEach(drone => {
        if (drone.queue.length < mindrone.queue.length) {
          mindrone = drone;
        }
      });

      mindrone.queue.push(state.queue[0]);

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
