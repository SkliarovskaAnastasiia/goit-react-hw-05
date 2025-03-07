import { useEffect, useState } from 'react';
import { getMovieTrailer } from '../../utils/tmdb-api';
import ReactModal from 'react-modal';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function TrailerModal({ movieId, lang, isOpen, onCloseModal }) {
  const [trailerKey, setTrailerKey] = useState();
  const videoUrl = `https://www.youtube.com/embed/${trailerKey}`;

  useEffect(() => {
    if (!movieId) return;

    (async () => {
      const { results } = await getMovieTrailer(movieId, lang);
      const trailerData = results.find(result => result.type === 'Trailer');
      setTrailerKey(trailerData.key);
    })();
  }, [movieId, lang]);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onCloseModal}>
      {isOpen && <iframe src={videoUrl} />}
    </ReactModal>
  );
}
