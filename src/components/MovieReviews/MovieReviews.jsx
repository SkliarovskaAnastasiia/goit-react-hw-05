import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesReviews } from '../../utils/tmdb-api';
import MovieReviewItem from '../MovieReviewItem/MovieReviewItem';
import toast from 'react-hot-toast';
import css from './MovieReviews.module.css';
import { useTranslation } from 'react-i18next';

export default function MovieReviews({ lang }) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const { results } = await getMoviesReviews(movieId, lang);
        setReviews(results);
      } catch {
        toast.error('Something went wrong, try again', { duration: 3000 });
      }
    })();
  }, [movieId, lang]);

  return (
    <>
      {reviews?.length > 0 ? (
        <ul className={css.reviewslist}>
          {reviews.map(review => (
            <li key={review.id} className={css.reviewItem}>
              <MovieReviewItem item={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noReviews}>{t('reviews.noReviews')}</p>
      )}
    </>
  );
}
