import { use, useEffect, useState } from 'react';
import { getTrendingMovies } from '../../utils/tmdb-api';
import { LangContext } from '../../components/langContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import MovieList from '../../components/MovieList/MovieList';
import Hero from '../../components/Hero/Hero';

export default function HomePage() {
  const { lang } = use(LangContext);
  const { t } = useTranslation();

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
      <Hero />
      <h2 className="homePageTitle">{t('homePage.title')}</h2>
      <MovieList movies={trendingMovies} />
    </>
  );
}
