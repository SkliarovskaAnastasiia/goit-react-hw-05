import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import css from './MoviesCategoriesBtns.module.css';

const categories = ['top_rated', 'popular', 'now_playing'];

export default function MoviesCategoriesBtns({ active, onClick }) {
  const { t } = useTranslation();

  const handleClick = value => {
    onClick(value);
  };

  const addActiveClass = selected => {
    return clsx(css.category, selected === active && css.active);
  };

  return (
    <ul className={css.categoryList}>
      {categories.map((category, idx) => (
        <li key={idx}>
          <button
            type="button"
            onClick={() => handleClick(category)}
            className={addActiveClass(category)}
          >
            {t(`moviePage.category.${category}`)}
          </button>
        </li>
      ))}
    </ul>
  );
}
