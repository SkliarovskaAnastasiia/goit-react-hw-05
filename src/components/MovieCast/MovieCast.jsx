import { useState, useEffect } from 'react';
import { getMovieCast } from '../../utils/tmdb-api';
import { useParams } from 'react-router-dom';
import MovieCastItem from '../MovieCastItem/MovieCastItem';
import css from './MovieCast.module.css';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function MovieCast({ lang }) {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const { cast } = await getMovieCast(movieId, lang);
        setActors(cast);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      }
    })();
  }, [movieId, lang]);

  return (
    <>
      {actors.length > 0 ? (
        <ul className={css.actorsList}>
          {actors.map(actor => (
            <li key={actor.id} className={css.actorsItem}>
              <MovieCastItem item={actor} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noCast}>{t('cast.noCast')}</p>
      )}
    </>
  );
}
