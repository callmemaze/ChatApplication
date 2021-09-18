import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import routes from "./Routes.js";
import { addUser, removeUser, getUsers, getRoomUsers } from "./users.js";
import { message } from "./message.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(routes);

io.on("connection", (socket) => {
  socket.on("join", ({ userName, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, userName, room });
    if (error) return callback(error);
    socket.emit(
      "message",
      message("System", `Welcome to the ${user.room}, ${user.userName}`)
    );
    socket.broadcast
      .to(`${user.room}`)
      .emit(
        "message",
        message("System", `${user.userName} has joined the channel`)
      );
    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (msg, callback) => {
    const user = getUsers(socket.id);
    io.to(user.room).emit("message", message(user.userName, msg));
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        message("System", `${user.userName} has left the channel`)
      );
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started in PORT: ${PORT}`);
});
