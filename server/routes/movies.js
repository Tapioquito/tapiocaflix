const router = require("express").Router();
const { prismadb } = require("../db");

router.get("/movies/list", async (req, res) => {
  const offset = parseInt(req.query.offset);
  const count = await prismadb.movie.count();
  const movies = await prismadb.movie.findMany({
    take: 12,
    skip: offset,
  });
  return res.json({ movies, count });
});

router.get("/movie/:id", async (req, res) => {
  const id = req.params.id;

  const movie = await prismadb.movie.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res.send(movie);
});
module.exports = router;
