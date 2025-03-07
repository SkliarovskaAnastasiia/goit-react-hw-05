import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useEffect, useMemo, useRef, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getMovieByName, getTopRatedMovies } from '../../utils/tmdb-api';
import { Formik, Form, Field } from 'formik';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import css from './MoviesPage.module.css';
import { t } from 'i18next';

export default function MoviesPage({ lang }) {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState(0);

  const [notFound, setNotFound] = useState(false);

  const inputRef = useRef();
  const nextBtnRef = useRef();
  const prevBtnRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const { results, total_pages } = await getTopRatedMovies(page, lang);
        setMovies(results);
        setTotalPages(total_pages);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      }
    })();
  }, [page, lang]);

  useEffect(() => {
    if (query === '') return;

    (async () => {
      try {
        setNotFound(false);
        const { results, total_pages } = await getMovieByName(
          query,
          page,
          lang
        );
        setMovies(results);
        setTotalPages(total_pages);

        if (results.length === 0) setNotFound(true);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      }
    })();
  }, [query, page, lang]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [movies]);

  const memoizedMovies = useMemo(() => movies, [movies]);

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  };

  const handleSubmit = values => {
    const searchedQuery = values.query.trim();
    if (searchedQuery === '') {
      setMovies([]);
      setTotalPages(0);

      toast('Please enter your request', {
        duration: 3000,
        icon: <AiOutlineInfoCircle size={24} />,
      });

      setSearchParams({});
      return;
    }

    setSearchParams({ query: searchedQuery, page: 1 });

    inputRef.current.blur();
  };

  const handleClickPrevBtn = () => {
    const prevPage = page - 1;
    updateSearchParams('page', prevPage);

    prevBtnRef.current.blur();
  };

  const handleClickNextBtn = () => {
    const nextPage = page + 1;
    updateSearchParams('page', nextPage);

    nextBtnRef.current.blur();
  };

  return (
    <>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className={css.form}>
          <Field
            className={css.formField}
            type="text"
            name="query"
            autoComplete="off"
            ref={inputRef}
            placeholder="Search..."
          />
          <button className={css.formBtn} type="submit">
            <IoSearchOutline size={24} />
          </button>
        </Form>
      </Formik>
      {movies.length > 0 && <MovieList movies={memoizedMovies} />}
      {notFound && (
        <div className={css.textWrapper}>
          <p className={css.notFoundText}>{t('moviePage.notFound')}</p>
        </div>
      )}

      {totalPages > 1 && (
        <ul className={css.navBtnList}>
          <li>
            <button
              className={css.navBtn}
              type="button"
              onClick={handleClickPrevBtn}
              disabled={page === 1}
              ref={prevBtnRef}
            >
              Prev
            </button>
          </li>
          <li>
            <button
              className={css.navBtn}
              type="button"
              onClick={handleClickNextBtn}
              disabled={page === totalPages}
              ref={nextBtnRef}
            >
              Next
            </button>
          </li>
        </ul>
      )}
    </>
  );
}
