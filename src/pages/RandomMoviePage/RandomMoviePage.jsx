import { useTranslation } from 'react-i18next';
import { getPopularMovies } from '../../utils/tmdb-api';
import { useEffect, useState } from 'react';
import { formatDateToYear } from '../../helpers/formatDateToYear';
import { Link, useLocation } from 'react-router-dom';
import css from './RandomMoviePage.module.css';

const getRandomPageNum = () => {
  return Math.floor(Math.random() * 50 + 1);
};

export default function RandomMoviePage({ lang }) {
  const { t } = useTranslation();
  const imgUrl = 'https://image.tmdb.org/t/p/w500/';
  const location = useLocation();
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

      <div className={css.wrapper}>
        {movie && (
          <div
            className={css.movieInfo}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgUrl}${movie.backdrop_path})`,
            }}
          >
            <h2 className={css.movieTitle}>{movie.title}</h2>
            <p className={css.movieDate}>
              {formatDateToYear(movie.release_date)}
            </p>

            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={css.seeMoreLink}
            >
              {t('randomPage.seeMore')}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
