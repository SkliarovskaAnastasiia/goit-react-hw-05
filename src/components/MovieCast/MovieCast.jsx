import { useState, useEffect, use } from 'react';
import { getMovieCast } from '../../utils/tmdb-api';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LangContext } from '../langContext';
import MovieCastItem from '../MovieCastItem/MovieCastItem';
import toast from 'react-hot-toast';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { lang } = use(LangContext);
  const { t } = useTranslation();

  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

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
