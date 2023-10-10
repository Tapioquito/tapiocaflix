const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.send("Hello there");
});

app.use("", require("./routes/movies"));
app.use("/auth", require("./routes/auth"));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
