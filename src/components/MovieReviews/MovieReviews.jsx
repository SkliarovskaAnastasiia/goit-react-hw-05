import { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesReviews } from '../../utils/tmdb-api';
import { useTranslation } from 'react-i18next';
import { LangContext } from '../langContext';
import MovieReviewItem from '../MovieReviewItem/MovieReviewItem';
import toast from 'react-hot-toast';
import css from './MovieReviews.module.css';
import Loader from '../Loader/Loader';

export default function MovieReviews() {
  const { lang } = use(LangContext);
  const { t } = useTranslation();

  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const { results } = await getMoviesReviews(movieId, lang);
        setReviews(results);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [movieId, lang]);

  return (
    <>
      {isLoading && <Loader />}{' '}
      {reviews?.length > 0 && (
        <ul className={css.reviewslist}>
          {reviews.map(review => (
            <li key={review.id} className={css.reviewItem}>
              <MovieReviewItem item={review} />
            </li>
          ))}
        </ul>
      )}
      {reviews?.length === 0 && !isLoading && (
        <p className={css.noReviews}>{t('reviews.noReviews')}</p>
      )}
    </>
  );
}
