import { IoIosArrowRoundBack } from 'react-icons/io';
import { Suspense, use, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieById } from '../../utils/tmdb-api';
import { useTranslation } from 'react-i18next';
import { LangContext } from '../../components/langContext';
import Loader from '../../components/Loader/Loader';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

function addClasses({ isActive }) {
  return clsx(css.itemLink, isActive && css.activeLink);
}

export default function MovieDetailsPage() {
  const { lang } = use(LangContext);
  const { t } = useTranslation();

  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});
  const location = useLocation();
  const backlink = useRef(location.state || '/movies');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    (async () => {
      try {
        const response = await getMovieById(movieId, lang);
        setMovieData(response);
        document.title = `${response.title}`;
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      }
    })();

    return () => (document.title = 'FilmFinder');
  }, [movieId, lang]);

  return (
    <div className="container">
      <Link to={backlink.current} className={css.backBtn}>
        <IoIosArrowRoundBack size={24} className={css.backIcon} />
        <p>{t('movieDetailsPage.backlink')}</p>
      </Link>

      <MovieDetails movie={movieData} lang={lang} />

      <ul className={css.additionalList}>
        <li>
          <NavLink to="reviews" state={location.state} className={addClasses}>
            {t('movieDetailsPage.reviews')}
          </NavLink>
        </li>
        <li>
          <NavLink to="cast" state={location.state} className={addClasses}>
            {t('movieDetailsPage.cast')}
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
