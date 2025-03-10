import { useEffect, useState } from 'react';
import { getMovieTrailer } from '../../utils/tmdb-api';
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import css from './TrailerModal.module.css';

Modal.setAppElement('#root');

export default function TrailerModal({ movieId, lang, isOpen, onCloseModal }) {
  const [trailerKey, setTrailerKey] = useState();
  const videoUrl = `https://www.youtube-nocookie.com/embed/${trailerKey}`;

  useEffect(() => {
    if (!movieId) return;

    (async () => {
      const { results } = await getMovieTrailer(movieId, lang);
      let trailerData = results.find(result => result.type === 'Trailer');

      if (!trailerData && lang === 'uk-UA') {
        const { results } = await getMovieTrailer(movieId, 'en-US');
        trailerData = results.find(result => result.type === 'Trailer');
      }

      setTrailerKey(trailerData.key);
    })();
  }, [movieId, lang]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      contentLabel="Movie Trailer"
      className={css.modalContent}
      overlayClassName={{
        base: css.modalOverlay,
        afterOpen: css.modalOverlayAfterOpen,
        beforeClose: css.modalOverlayBeforeClose,
      }}
    >
      {isOpen && (
        <iframe src={videoUrl} width="100%" height="100%" allowFullScreen />
      )}
    </ReactModal>
  );
}
