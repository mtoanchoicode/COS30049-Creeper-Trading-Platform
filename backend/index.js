const express = require("express");
// require("dotenv").config();
const app = express();
const port = 3000;

app.get("/tasks", (req, res) => {
  res.send("Tasks list");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
