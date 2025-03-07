import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTrendingMovies } from '../../utils/tmdb-api';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function HomePage({ lang }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { t } = useTranslation();
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
      <h2 className="homePageTitle">{t('homePage.title')}</h2>
      <MovieList movies={trendingMovies} />
    </>
  );
}
