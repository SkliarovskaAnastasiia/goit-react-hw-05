import { TbError404 } from 'react-icons/tb';
import css from './NotFounPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className={css.wrapper}>
      <TbError404 size={120} color="#747bff" />
      <p className={css.message}>Page not found</p>
    </div>
  );
}
