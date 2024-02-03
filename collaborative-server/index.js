const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const dbConnect = require("./dbConnect");
const authRouter = require("./router/router");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});



//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Map to store connected clients
const connectedClients = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // set connected clients
  connectedClients.set(socket.id, socket);

  socket.on("enter", () => {
    const totalClient = getTotalClients();
    console.log(totalClient);
    io.emit("totalUser", totalClient);
  });

  socket.on("collaborate", (collabId) => {
    socket.join(collabId);
    console.log("User Joined");
  });

  socket.on("commit message", ({ collabId, message, style }) => {
    console.log(collabId, message, style);
    io.to(collabId).emit("receiveCommitMessage", { message, style });
  });

  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id, "reason", reason);
  });
});

io.on("connect_error", (error) => {
  console.error("Connection error", error);
});

// FUNCTION TO COUNT TOTAL NUMBER OF CLIENTS
function getTotalClients() {
  const totalClients = Array.from(connectedClients.keys());
  return totalClients;
}

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/auth", authRouter);

dbConnect();
