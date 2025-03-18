import { useTranslation } from 'react-i18next';
import { getPopularMovies } from '../../utils/tmdb-api';
import { use, useEffect, useState } from 'react';
import { LangContext } from '../../components/langContext';
import RandomMovie from '../../components/RandomMovie/RandomMovie';
import css from './RandomMoviePage.module.css';

const getRandomPageNum = () => {
  return Math.floor(Math.random() * 50 + 1);
};

export default function RandomMoviePage() {
  const { lang } = use(LangContext);
  const { t } = useTranslation();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    document.title = 'FilmFinder | Random Movie';
    return () => (document.title = 'FilmFinder');
  }, [lang]);

  const handleClick = async () => {
    const page = getRandomPageNum();

    const { results } = await getPopularMovies(page, lang);
    const movieIdx = Math.floor(Math.random() * results.length);
    const randomMovie = results[movieIdx];
    setMovie(randomMovie);
  };

  return (
    <>
      <div className={css.background}>
        <button type="button" onClick={handleClick} className={css.generateBtn}>
          {t('randomPage.generateBtn')}
        </button>
      </div>

      <RandomMovie movie={movie} />
    </>
  );
}
