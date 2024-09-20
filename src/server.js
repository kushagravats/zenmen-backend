const express = require("express");
const http = require("http");
const { Server: SocketIO } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sendNotification } = require("./controllers/notificationController");

const app = express();
const server = http.createServer(app);

const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));
app.use(express.json());
app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendNotification", (data) => {
    io.emit("notification", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post("/api/notifications/send", (req, res) =>
  sendNotification(req, res, io)
);

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
