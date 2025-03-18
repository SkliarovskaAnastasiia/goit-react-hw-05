import ReactModal from 'react-modal';
import Modal from 'react-modal';
import css from './TrailerModal.module.css';

Modal.setAppElement('#root');

export default function TrailerModal({ videoUrl, isOpen, onCloseModal }) {
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
