require("dotenv").config();
const http = require("http");
const path = require("path");
const cors = require("cors");
const express = require("express");

const PORT = process.env.PORT || 4000;

require("./config/connection");
const socket = require("./socket");
const rootRrouter = require("./src/routes");
const { originOption } = require("./config/constant");

const app = express();
const server = http.createServer(app);
const io = socket.init(server);

const corsOptions = {
  credentials: true,
  origin: originOption,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use([
  express.json(),
  cors(corsOptions),
  express.static(path.join(__dirname, process.env.UPLOAD_PATH)),
]);

app.use(process.env.URL_PREFIX, rootRrouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

io.on("connection", (socket) => {
  console.info("A user connected.");

  socket.on("disconnect", () => {
    console.info("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
