import { formatDateToYear } from '../../helpers/formatDateToYear';
import { Link, useLocation } from 'react-router-dom';
import css from './RandomMovie.module.css';
import { useTranslation } from 'react-i18next';

export default function RandomMovie({ movie }) {
  const imgUrl = 'https://image.tmdb.org/t/p/w500/';
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className={css.wrapper}>
      {movie && (
        <div
          className={css.movieInfo}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgUrl}${
              movie.backdrop_path || movie.poster_path
            })`,
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
  );
}
