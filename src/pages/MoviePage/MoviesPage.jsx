import { AiOutlineInfoCircle } from 'react-icons/ai';
import { use, useEffect, useRef, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import {
  getMovieByName,
  getMoviesByCategory,
  getMoviesByGenres,
} from '../../utils/tmdb-api';
import { useSearchParams } from 'react-router-dom';
import { LangContext } from '../../components/langContext';
import { t } from 'i18next';
import toast from 'react-hot-toast';
import SearchByNameForm from '../../components/SearchByNameForm/SearchByNameForm';
import SearchByGenresForm from '../../components/SearchByGenresForm/SearchByGenresForm';
import Loader from '../../components/Loader/Loader';
import MoviesCategoriesBtns from '../../components/MoviesCategoriesBtns/MoviesCategoriesBtns';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const { lang } = use(LangContext);

  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get('query') || '';
  const genres = searchParams.get('genres') || '';
  const category = searchParams.get('category') || 'top_rated';
  const page = Number(searchParams.get('page')) || 1;

  const nextBtnRef = useRef();
  const prevBtnRef = useRef();

  useEffect(() => {
    document.title = 'FilmFinder | Movies';
    return () => (document.title = 'FilmFinder');
  }, []);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        let resp = null;
        if (query) {
          resp = await getMovieByName(query, page, lang);
        } else if (genres) {
          resp = await getMoviesByGenres(lang, genres, page);
        } else if (category) {
          resp = await getMoviesByCategory(page, lang, category);
        }
        setMovies(resp?.results);
        setTotalPages(resp?.total_pages);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, genres, category, page, lang]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [movies]);

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

  const handleChangeCategory = selectedCategory => {
    setSearchParams({ category: selectedCategory, page: 1 });
  };

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
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

  console.log(movies);

  return (
    <>
      <SearchByNameForm onSubmit={handleQuerySubmit} />
      <SearchByGenresForm lang={lang} onSubmit={handleGenresSubmit} />
      <MoviesCategoriesBtns
        active={query || genres ? '' : category}
        onClick={handleChangeCategory}
      />

      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length === 0 && !isLoading && (
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
