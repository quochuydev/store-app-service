require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 4000;

const { ticketRoute } = require("./routes/ticket");
const { fileRoute } = require("./routes/file");
const { blogRoute } = require("./routes/blog");

console.log("*********************************");
console.log("port:", port);
console.log("env:", process.env.NODE_ENV);
console.log("is production:", process.env.NODE_ENV === "production");
console.log("database:", process.env.DATABASE_URL);
console.log("*********************************");

mongoose.connect(
  process.env.DATABASE_URL || "mongodb://localhost:27017/service",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const server = express();

server.use(cors({ credentials: true, origin: true }));
server.use(bodyParser.json({}));
server.use(bodyParser.urlencoded({ extended: false }));

server.get("/", async (req, res) => {
  res.send("service");
});

server.use(ticketRoute);
server.use(fileRoute);
server.use(blogRoute);

server.use((err, req, res, next) => {
  if (err) {
    return res.status(400).send(err);
  }
  next();
});

server.get("/order", async (req, res) => {
  res.send("order");
});

server.listen(port, () => {
  console.log(`> Ready on port:${port}`);
});

const tasks = [1000, 4000, 2000, 3000, 1000];

const job = (input) => {
  console.log(input);
};

tasks.forEach((e) => {
  job(e);
});
