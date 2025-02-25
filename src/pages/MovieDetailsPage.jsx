import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../tmdb-api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});

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

  console.log(movieData);
  return (
    <div>
      <img />
      <h2>Title</h2>
    </div>
  );
}
