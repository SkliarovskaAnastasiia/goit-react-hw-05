import { useState, useEffect } from 'react';
import { getMovieCast } from '../../tmdb-api';
import { useParams } from 'react-router-dom';
import MovieCastItem from '../MovieCastItem/MovieCastItem';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { cast } = await getMovieCast(movieId);
        setActors(cast);
      } catch (err) {
        console.log(err);
      }
    })();
  });
  return (
    <ul className={css.actorsList}>
      {actors.map(actor => (
        <li key={actor.id} className={css.actorsItem}>
          <MovieCastItem item={actor} />
        </li>
      ))}
    </ul>
  );
}
