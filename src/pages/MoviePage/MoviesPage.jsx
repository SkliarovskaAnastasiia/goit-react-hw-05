import { AiOutlineInfoCircle } from 'react-icons/ai';
import { use, useEffect, useMemo, useRef, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import {
  getMovieByName,
  getMoviesByGenres,
  getTopRatedMovies,
} from '../../utils/tmdb-api';
import { useSearchParams } from 'react-router-dom';
import { LangContext } from '../../components/langContext';
import { t } from 'i18next';
import toast from 'react-hot-toast';
import SearchByNameForm from '../../components/SearchByNameForm/SearchByNameForm';
import SearchByGenresForm from '../../components/SearchByGenresForm/SearchByGenresForm';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const { lang } = use(LangContext);

  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState(0);

  const genres = searchParams.get('genres') || '';

  const nextBtnRef = useRef();
  const prevBtnRef = useRef();

  useEffect(() => {
    document.title = 'FilmFinder | Movies';
    return () => (document.title = 'FilmFinder');
  }, []);

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
        const { results, total_pages } = await getMovieByName(
          query,
          page,
          lang
        );
        setMovies(results);
        setTotalPages(total_pages);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      }
    })();
  }, [query, page, lang]);

  useEffect(() => {
    (async () => {
      if (genres === '') {
        try {
          const { results, total_pages } = await getTopRatedMovies(page, lang);
          setMovies(results);
          setTotalPages(total_pages);
        } catch {
          toast.error('Something went wrong, try again', {
            duration: 3000,
          });
        }
        return;
      }

      try {
        const { results, total_pages } = await getMoviesByGenres(
          lang,
          genres,
          page
        );
        setMovies(results);
        setTotalPages(total_pages);
        console.log(results);
      } catch {
        toast.error('Something went wrong, try again', {
          duration: 3000,
        });
      }
    })();
  }, [lang, page, genres]);

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

  const handleQuerySubmit = searchedQuery => {
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
  };

  const handleGenresSubmit = searchedGenres => {
    setSearchParams({ genres: searchedGenres, page: 1 });
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
      <SearchByNameForm onSubmit={handleQuerySubmit} />
      <SearchByGenresForm lang={lang} onSubmit={handleGenresSubmit} />

      {movies.length > 0 && <MovieList movies={memoizedMovies} />}
      {movies.length === 0 && (
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
