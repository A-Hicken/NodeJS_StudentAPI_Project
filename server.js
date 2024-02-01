const express = require("express");
const cors = require("cors");
const mongodb = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors()).use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log("\x1b[45m", `Connected to DB and listening on ${PORT}`);
  }
});
