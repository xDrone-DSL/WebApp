var state = require("./state.json");

const feedbackOptions = {
  APPROVE: "Your code is approved! 👍 Now it's waiting for a drone to fly...",
  ALMOST_THERE:
    "Your code is pretty good but there's still something small that you need to change. Have a look! 😃 ",
  NEEDS_MORE_WORK:
    "Good work, but more work is needed for this task. Think about your code again. 🤔 The teacher will come over soon to help you!"
};

module.exports = io => {
  console.log("Sync module ready");

  io.on("connection", function(socket) {
    console.log(socket.id);
    io.emit("UPDATE", state);

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
      io.emit("FEEDBACK", feedbackOptions.APPROVE);
    });

    socket.on("FLY", data => {
      console.log("FLY DRONE " + data.mac);
      state.drones.filter(d => d.mac === data.mac)[0].queue.shift(1);
      io.emit("UPDATE", state);
    });

    socket.on("REJECT1", () => {
      console.log("REJECT1");
      state.queue.shift(1);
      io.emit("UPDATE", state);
      io.emit("FEEDBACK", feedbackOptions.ALMOST_THERE);
    });

    socket.on("REJECT2", () => {
      console.log("REJECT2");
      state.queue.shift(1);
      io.emit("UPDATE", state);
      io.emit("FEEDBACK", feedbackOptions.NEEDS_MORE_WORK);
    });

    socket.on("REQUESTFLIGHT", data => {
      data["hide"] = false;
      state.queue.push(data);
      io.emit("UPDATE", state);
    });
  });
};
