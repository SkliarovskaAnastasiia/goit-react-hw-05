import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import { getTrendingMovies } from '../tmdb-api';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { results } = await getTrendingMovies();
        setTrendingMovies(results);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <h2 className="homePageTitle">Trending Today</h2>
      <MovieList movies={trendingMovies} />;
    </>
  );
}
