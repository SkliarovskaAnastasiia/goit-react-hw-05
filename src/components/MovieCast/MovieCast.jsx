import { useState, useEffect, use } from 'react';
import { getMovieCast } from '../../utils/tmdb-api';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LangContext } from '../langContext';
import MovieCastItem from '../MovieCastItem/MovieCastItem';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { lang } = use(LangContext);
  const { t } = useTranslation();

  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const { cast } = await getMovieCast(movieId, lang);
        setActors(cast);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [movieId, lang]);

  return (
    <>
      {isLoading && <Loader />}
      {actors?.length > 0 && (
        <ul className={css.actorsList}>
          {actors.map(actor => (
            <li key={actor.id} className={css.actorsItem}>
              <MovieCastItem item={actor} />
            </li>
          ))}
        </ul>
      )}
      {actors?.length === 0 && !isLoading && (
        <p className={css.noCast}>{t('cast.noCast')}</p>
      )}
    </>
  );
}
