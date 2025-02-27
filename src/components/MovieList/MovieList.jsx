import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { formatDateToYear } from '../../helpers/formatDateToYear';

export default function MovieList({ movies }) {
  const imgUrl = 'https://image.tmdb.org/t/p/w500/';
  const location = useLocation();

  return (
    <div className="container">
      <ul className={css.moviesList}>
        {movies.map(({ id, poster_path, title, release_date }) => (
          <li key={id} className={css.movieListItem}>
            <Link
              to={`/movies/${id}`}
              state={location}
              className={css.movieLink}
            >
              <img src={`${imgUrl}${poster_path}`} className={css.poster} />
              <p className={css.movieTitle}>{title}</p>
              <p className={css.movieYear}>{formatDateToYear(release_date)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
