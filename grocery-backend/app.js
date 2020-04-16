const http = require("http");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

const usersRouter = require("./routes/users");

// * configure dotenv to access environment variables
dotenv.config();

// * Normalize a port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// * create express instance
const app = express();

// * Get port from environment and store in Express.

const PORT = normalizePort(process.env.PORT || "5000");
app.set("port", PORT);

// * Create HTTP server.
const server = http.createServer(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", (req, res, next) => {
  res.status(200).json("Hello World");
});
app.use("/users", usersRouter);

// * catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// * error handler
app.use((err, req, res, next) => {
  // console.log("Error- ", err);
  res.statusCode = err.status || 500;
  res.setHeader("Content-Type", "application/json");
  res.json(
    err.message
      ? { message: err.message }
      : { message: "Internal Server Error" }
  );
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
