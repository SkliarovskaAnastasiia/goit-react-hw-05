import { IoIosArrowRoundBack } from 'react-icons/io';
import { Suspense, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieById } from '../../tmdb-api';
import { formatDateToYear } from '../../helpers/formatDateToYear';
import { formatRuntime } from '../../helpers/formatRuntime';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader';

function addClasses({ isActive }) {
  return clsx(css.itemLink, isActive && css.activeLink);
}

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});
  const imgUrl = 'https://image.tmdb.org/t/p/w500/';
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const response = await getMovieById(movieId);
        setMovieData(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [movieId]);

  return (
    <div className="container">
      <Link to={location.state ?? '/movies'} className={css.backBtn}>
        <IoIosArrowRoundBack size={24} className={css.backIcon} /> Go back
      </Link>
      <div className={css.detailsWrapper}>
        <img src={`${imgUrl}${movieData.poster_path}`} className={css.poster} />
        <div className={css.movieInfo}>
          <h2 className={css.movieTitle}>{movieData.title}</h2>
          <p className={css.movieDate}>
            {movieData.release_date && formatDateToYear(movieData.release_date)}
          </p>
          <ul>
            <li className={css.movieInfoItem}>
              {movieData.production_countries?.length > 1
                ? 'Counties:'
                : 'Country:'}
              &#160;
              {movieData.production_countries?.map((country, idx) => (
                <p key={idx} className={`${css.text} ${css.textList}`}>
                  {country.name}
                </p>
              ))}
            </li>
            <li className={css.movieInfoItem}>
              Genres:&#160;
              {movieData.genres?.map((genre, idx) => (
                <p key={idx} className={`${css.text} ${css.textList}`}>
                  {genre.name}
                </p>
              ))}
            </li>
            <li className={css.movieInfoItem}>
              Runtime:&#160;
              <p className={css.text}>{formatRuntime(movieData.runtime)}</p>
            </li>
            <li className={css.movieInfoItem}>
              Average:&#160;<p className={css.text}>{movieData.vote_average}</p>
            </li>
          </ul>
          <p className={css.tagline}>{movieData.tagline}</p>
          <h4 className={css.overview}>Overview</h4>
          <p className={css.movieOverview}>{movieData.overview}</p>
        </div>
      </div>
      <ul className={css.additionalList}>
        <li>
          <NavLink to="reviews" className={addClasses}>
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="cast" className={addClasses}>
            Cast
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
