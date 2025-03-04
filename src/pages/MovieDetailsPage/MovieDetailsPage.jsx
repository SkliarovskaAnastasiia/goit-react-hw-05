import { IoIosArrowRoundBack } from 'react-icons/io';
import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieById } from '../../tmdb-api';
import clsx from 'clsx';
import Loader from '../../components/Loader/Loader';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import toast from 'react-hot-toast';
import css from './MovieDetailsPage.module.css';

function addClasses({ isActive }) {
  return clsx(css.itemLink, isActive && css.activeLink);
}

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});
  const location = useLocation();
  const backlink = useRef(location.state || '/movies');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    (async () => {
      try {
        const response = await getMovieById(movieId);
        setMovieData(response);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      }
    })();
  }, [movieId]);

  return (
    <div className="container">
      <Link to={backlink.current} className={css.backBtn}>
        <IoIosArrowRoundBack size={24} className={css.backIcon} /> Go back
      </Link>

      <MovieDetails movie={movieData} />

      <ul className={css.additionalList}>
        <li>
          <NavLink to="reviews" state={location.state} className={addClasses}>
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="cast" state={location.state} className={addClasses}>
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
