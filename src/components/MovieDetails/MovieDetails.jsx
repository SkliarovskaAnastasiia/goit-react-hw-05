import { IoPlay } from 'react-icons/io5';
import { formatDateToYear } from '../../helpers/formatDateToYear';
import { formatRuntime } from '../../helpers/formatRuntime';
import { useTranslation } from 'react-i18next';
import { LangContext } from '../langContext';
import { use, useState, useEffect } from 'react';
import { getMovieTrailer } from '../../utils/tmdb-api';
import noPosterHolder from '../../assets/noPosterHolder.jpg';
import TrailerModal from '../TrailerModal/TrailerModal';
import css from './MovieDetails.module.css';

export default function MovieDetails({
  movie: {
    id,
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
  const { lang } = use(LangContext);
  const { t } = useTranslation();

  const [trailerKey, setTrailerKey] = useState();
  const videoUrl = `https://www.youtube-nocookie.com/embed/${trailerKey}`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (!id) return;

    (async () => {
      const { results } = await getMovieTrailer(id, lang);
      let trailerData = results.find(result => result.type === 'Trailer');

      if (!trailerData && lang === 'uk-UA') {
        const { results } = await getMovieTrailer(id, 'en-US');
        trailerData = results.find(result => result.type === 'Trailer');
      }
      setTrailerKey(trailerData?.key);
    })();
  }, [id, lang]);

  return (
    <>
      <div className={css.detailsWrapper}>
        <img
          src={poster_path ? `${imgUrl}${poster_path}` : noPosterHolder}
          className={css.poster}
        />
        <div className={css.movieInfo}>
          <div>
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
            {tagline && <p className={css.tagline}>{tagline}</p>}
            {overview && (
              <h4 className={css.overview}>{t('movieDetails.overview')}</h4>
            )}
            <p className={css.movieOverview}>{overview}</p>
          </div>

          {trailerKey && (
            <button
              type="button"
              className={css.trailerBtn}
              onClick={handleToggleModal}
            >
              <IoPlay size={20} /> <p>{t('movieDetails.trailer')}</p>
            </button>
          )}

          <TrailerModal
            videoUrl={videoUrl}
            isOpen={isModalOpen}
            onCloseModal={handleToggleModal}
          />
        </div>
      </div>
    </>
  );
}
