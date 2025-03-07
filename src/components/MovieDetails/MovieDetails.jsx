import { formatDateToYear } from '../../helpers/formatDateToYear';
import { formatRuntime } from '../../helpers/formatRuntime';
import noPosterHolder from '../../assets/noPosterHolder.jpg';
import css from './MovieDetails.module.css';
import { useTranslation } from 'react-i18next';

export default function MovieDetails({
  movie: {
    poster_path,
    title,
    release_date,
    production_countries,
    genres,
    runtime,
    vote_average,
    tagline,
    overview,
  },
}) {
  const imgUrl = 'https://image.tmdb.org/t/p/w500/';
  const { t } = useTranslation();

  return (
    <>
      <div className={css.detailsWrapper}>
        <img
          src={poster_path ? `${imgUrl}${poster_path}` : noPosterHolder}
          className={css.poster}
        />
        <div className={css.movieInfo}>
          <h2 className={css.movieTitle}>{title}</h2>
          <p className={css.movieDate}>
            {release_date && formatDateToYear(release_date)}
          </p>
          <ul>
            <li className={css.movieInfoItem}>
              {t('movieDetails.country', {
                count: production_countries?.length,
              })}
              : &#160;
              {production_countries?.map((country, idx) => (
                <p key={idx} className={`${css.text} ${css.textList}`}>
                  {country.name}
                </p>
              ))}
            </li>
            <li className={css.movieInfoItem}>
              {t('movieDetails.genres')}:&#160;
              {genres?.map((genre, idx) => (
                <p key={idx} className={`${css.text} ${css.textList}`}>
                  {genre.name}
                </p>
              ))}
            </li>
            <li className={css.movieInfoItem}>
              {t('movieDetails.runtime')}:&#160;
              <p className={css.text}>{formatRuntime(runtime)}</p>
            </li>
            <li className={css.movieInfoItem}>
              {t('movieDetails.avarage')}:&#160;
              <p className={css.text}>{vote_average}</p>
            </li>
          </ul>
          <p className={css.tagline}>{tagline}</p>
          {overview && (
            <h4 className={css.overview}>{t('movieDetails.overview')}</h4>
          )}
          <p className={css.movieOverview}>{overview}</p>
        </div>
      </div>
    </>
  );
}
