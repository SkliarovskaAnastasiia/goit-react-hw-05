import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesReviews } from '../../tmdb-api';
import MovieReviewItem from '../MovieReviewItem/MovieReviewItem';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { results } = await getMoviesReviews(movieId);
        setReviews(results);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={css.reviewslist}>
          {reviews.map(review => (
            <li key={review.id} className={css.reviewItem}>
              <MovieReviewItem item={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p>We dont&apos;n have any reviews for this movie</p>
      )}
    </>
  );
}
