const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const usersRouter = require("./routes/users.js");

const connectToDatabase = require("./database/connect");
const cors = require("./middlewares/cors");

const app = express();
const PORT = 3005;

connectToDatabase();

app.use(
  cors,
  bodyParser.json(),
  express.static(path.join(__dirname, "public"))
);
app.use("/api", usersRouter);

app.listen(PORT);
