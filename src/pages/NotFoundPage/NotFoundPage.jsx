import { TbError404 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import css from './NotFounPage.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className={css.wrapper}>
      <TbError404 size={120} color="#747bff" />
      <p className={css.message}>{t('notFound')}</p>
    </div>
  );
}
