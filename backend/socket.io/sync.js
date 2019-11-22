let state = require("./state.json");

const feedbackOptions = {
  APPROVE: "Your code is approved! 👍 Now it's waiting for a drone to fly...",
  ALMOST_THERE:
    "Your code is pretty good but there's still some small thing that you need to change. Have a look! 😃 ",
  NEEDS_MORE_WORK:
    "Good work, but more work is needed for this task. Think about your code again 🤔. The teacher will come over soon to help you!"
};

const uidToSocketId = {};

module.exports = io => {
  console.log("Sync module ready");

  io.on("connection", function(socket) {
    console.log(socket.id);

    socket.on("NEW_USER", data => {
      const uid = data.teamName;
      console.log(uid);
      if (uid in uidToSocketId) {
        socket.emit("LOGIN_FAILED");
      } else {
        uidToSocketId[uid] = socket.id;
        socket.emit("LOGIN_APPROVED", { uid: uid });
      }
    });

    socket.emit("WHO");

    socket.on("IAM", data => {
      const uid = data.uid;
      if (!(uid in uidToSocketId)) {
        socket.emit("INVALID_I_AM");
        return;
      }
      uidToSocketId[uid] = socket.id;
    });

    socket.on("USER_LOGOUT", data => {
      const uid = data.uid;
      delete uidToSocketId[uid];
    });

    socket.on("REQUEST_FLIGHT", data => {
      data["hide"] = false;
      data["time"] = new Date();
      state.queue.push(data);
      io.emit("UPDATE", state);
    });

    socket.on("REQUEST_FLIGHT_PERMISSION", data => {
      const uid = data.uid;
      const socketId = uidToSocketId[uid];
      if (socketId) {
        if (state.queue.find(t => t.uid === uid)) {
          io.to(socketId).emit("REQUEST_FLIGHT_STATUS", { status: true });
          return;
        } else {
          let status = false;
          state.drones.forEach(drone => {
            status =
              status || drone.queue.find(t => t.uid === uid) !== undefined;
          });
          io.to(socketId).emit("REQUEST_FLIGHT_STATUS", { status: status });
        }
      }
    });

    socket.on("STUDENT_CANCEL_FLIGHT_REQUEST", data => {
      const uid = data.uid;
      const socketId = uidToSocketId[uid];
      state.queue = state.queue.filter(t => t.uid !== uid);
      state.drones.forEach(drone => {
        drone.queue = drone.queue.filter(t => t.uid !== uid);
      });
      if (socketId) {
        io.to(socketId).emit("REQUEST_CANCELLED");
      }
      io.emit("UPDATE", state);
    });

    socket.on("TEACHER", () => {
      socket.emit("UPDATE", state);

      socket.on("APPROVE", data => {
        const uid = data.uid;

        console.log(`APPROVE UID: ${uid}`);

        let mindrone = state.drones[0];
        state.drones.forEach(drone => {
          if (drone.queue.length < mindrone.queue.length) {
            mindrone = drone;
          }
        });

        mindrone.queue.push(state.queue[0]);

        state.queue = state.queue.filter(team => team.uid != uid);
        io.emit("UPDATE", state);

        if (uidToSocketId[uid]) {
          io.to(uidToSocketId[uid]).emit("FEEDBACK", feedbackOptions.APPROVE);
        }
      });

      socket.on("APPROVE_FINISH_TASK", data => {
        const mac = data.mac;
        const uid = data.uid;
        const socketId = uidToSocketId[uid];
        console.log(`"FLY DRONE uid:${uid} ${mac}`);
        if (socketId) {
          io.to(socketId).emit("REQUEST_FLIGHT_STATUS", { status: false });
          io.to(socketId).emit("NEXT_TASK");
        }
        state.drones.filter(d => d.mac === mac)[0].queue.shift(1);
        io.emit("UPDATE", state);
      });

      socket.on("TEACHER_CANCEL_FLIGHT_REQUEST", data => {
        const mac = data.mac;
        const uid = data.uid;
        const socketId = uidToSocketId[uid];
        console.log(`"FLY DRONE uid:${uid} ${mac}`);
        if (socketId) {
          io.to(socketId).emit("REQUEST_FLIGHT_STATUS", { status: false });
        }
        state.drones.filter(d => d.mac === mac)[0].queue.shift(1);
        io.emit("UPDATE", state);
      });

      socket.on("REJECT1", data => {
        rejection(data, "ALMOST_THERE");
      });

      socket.on("REJECT2", data => {
        rejection(data, "NEEDS_MORE_WORK");
      });
    });

    function rejection(data, rejectionType) {
      const uid = data.uid;

      console.log(`REJECT ${rejectionType}: ${uid}`);

      state.queue = state.queue.filter(team => team.uid != uid);

      io.emit("UPDATE", state);

      const socketId = uidToSocketId[uid];
      if (socketId) {
        io.to(socketId).emit("FEEDBACK", feedbackOptions[rejectionType]);
        io.to(socketId).emit("REQUEST_FLIGHT_STATUS", { status: false });
      }
    }
  });
};
