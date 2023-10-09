const express = require("express");
const movies = require("./movies.json");
const { prismadb } = require("./db");
const cors = require("cors");
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  return res.send("Hello there");
});

app.get("/movies/list", async (req, res) => {
  const offset = parseInt(req.query.offset);
  const count = prismadb.movie.count();
  const movies = await prismadb.movie.findMany({
    take: 12,
    skip: offset,
  });
  return res.json({ movies, count });
});

app.get("/movies/:id", async (req, res) => {
  const id = req.params.id;

  const movie = await prismadb.movie.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res.send(movie);
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
