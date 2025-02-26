import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { formatDateToYear } from '../../helpers/formatDateToYear';

export default function MovieList({ movies }) {
  const imgUrl = 'https://image.tmdb.org/t/p/w500/';
  const location = useLocation();

  return (
    <div className="container">
      <ul className={css.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={css.movieListItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={css.movieLink}
            >
              <img
                src={`${imgUrl}${movie.poster_path}`}
                className={css.poster}
              />
              <p className={css.movieTitle}>{movie.title}</p>
              <p className={css.movieYear}>
                {formatDateToYear(movie.release_date)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
