import { useEffect, useRef, useState } from 'react';
import { formatCreatedDate } from '../../helpers/formatCreatedDate';
import css from './MovieReviewItem.module.css';

export default function MovieReviewItem({
  item: { content, created_at, author },
}) {
  const checkboxRef = useRef();
  const contentRef = useRef();

  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    const contentHeight = contentRef.current.scrollHeight;
    const maxHeight =
      parseFloat(getComputedStyle(contentRef.current).lineHeight) * 3;

    setIsHide(contentHeight > maxHeight);
  }, [content]);

  const handleCheckboxFocus = () => {
    checkboxRef.current.blur();
  };

  return (
    <>
      <h4 className={css.username}>{author}</h4>
      <p className={css.reviewContent} ref={contentRef}>
        {content}
      </p>
      {isHide && (
        <input
          type="checkbox"
          className={css.showMoreBtn}
          ref={checkboxRef}
          onClick={handleCheckboxFocus}
        />
      )}

      <p className={css.createdDate}>{formatCreatedDate(created_at)}</p>
    </>
  );
}
