import { useRef } from 'react';
import { formatCreatedDate } from '../../helpers/formatCreatedDate';
import css from './MovieReviewItem.module.css';

export default function MovieReviewItem({
  item: { content, created_at, author },
}) {
  const checkboxRef = useRef();

  const handleCheckboxFocus = () => {
    checkboxRef.current.blur();
  };

  return (
    <>
      <h4 className={css.username}>{author}</h4>
      <p className={css.reviewContent}>{content}</p>
      <input
        type="checkbox"
        className={css.showMoreBtn}
        ref={checkboxRef}
        onClick={handleCheckboxFocus}
      />
      <p className={css.createdDate}>{formatCreatedDate(created_at)}</p>
    </>
  );
}
