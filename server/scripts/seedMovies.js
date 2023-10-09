const movies = require("../movies.json");
const { prismadb } = require("../db");
const seedMovies = async () => {
  const moviesFormated = movies.map(
    ({ title, description, thumbnailUrl, videoUrl, duration, genre }) => {
      return { title, description, thumbnailUrl, videoUrl, duration, genre };
    }
  );

  await prismadb.movie.deleteMany();
  await prismadb.movie.createMany({ data: moviesFormated });
};

seedMovies();
