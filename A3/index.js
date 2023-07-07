const express = require("express");
const routes = require("./routes/routes");

const app = express();
app.use(express.json());
app.use("", routes);

app.listen(8081, function () {
    console.log("Server started at 8081");
  });