import { Link, useLocation } from 'react-router-dom';
import { formatDateToYear } from '../../helpers/formatDateToYear';
import noPosterHolder from '../../assets/noPosterHolder.jpg';
import css from './MovieList.module.css';

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
              <img
                src={poster_path ? `${imgUrl}${poster_path}` : noPosterHolder}
                alt="Movie poster"
                className={css.poster}
              />

              <p className={css.movieTitle}>{title}</p>
              <p className={css.movieYear}>
                {release_date ? formatDateToYear(release_date) : 'Unknown'}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
