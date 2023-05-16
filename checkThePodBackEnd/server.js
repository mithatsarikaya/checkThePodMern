require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;
const { verifyJwt } = require("./middleware/verifyJwt");

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

//now our api is open to request that we specified id corsOptions
app.use(cors(corsOptions));

//with this middleware we can receive and parse json data
app.use(express.json());

app.use(cookieParser());

//where to find static files like css or images
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/users", verifyJwt, require("./routes/userRoutes"));
app.use("/pods", require("./routes/podRoutes"));
app.use("/auth", require("./routes/authRoutes"));

//when we put * for request it means that any request : it can be /asdasd or /455/asdsad
//since express look for response for requests from top to down.
//it means that if express showing this one, then it is 404
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ messsage: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
