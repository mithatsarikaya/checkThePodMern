const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const PORT = process.env.PORT || 3500;

app.use(logger);

//with this middleware we can receive and parse json data
app.use(express.json());

//where to find static files like css or images
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

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

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
