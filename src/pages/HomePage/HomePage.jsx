import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTrendingMovies } from '../../tmdb-api';
import toast from 'react-hot-toast';

export default function HomePage({ lang }) {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { results } = await getTrendingMovies(lang);
        setTrendingMovies(results);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      }
    })();
  }, [lang]);

  return (
    <>
      <h2 className="homePageTitle">Trending Today</h2>
      <MovieList movies={trendingMovies} />
    </>
  );
}
