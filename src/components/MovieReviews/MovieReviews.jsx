import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesReviews } from '../../tmdb-api';
import MovieReviewItem from '../MovieReviewItem/MovieReviewItem';
import toast from 'react-hot-toast';
import css from './MovieReviews.module.css';

export default function MovieReviews({ lang }) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

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
        <p className={css.noReviews}>
          We don&apos;t have any reviews for this movie
        </p>
      )}
    </>
  );
}
