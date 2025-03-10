import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import css from './Hero.module.css';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1574894078563-01e879b89809?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
      className={css.heroBgd}
    >
      <h1 className={css.heroTitle}>{t('hero.title')}</h1>
      <Link to={'/random'} className={css.heroLink}>
        {t('hero.clickBtn')}
      </Link>
    </div>
  );
}
