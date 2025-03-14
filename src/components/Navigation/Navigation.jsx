import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import css from './Navigation.module.css';

function addLinksClasses({ isActive }) {
  return clsx(css.navLink, isActive && css.activeLink);
}

export default function Navigation({ value, onChange, toggleMenu }) {
  const handleLangChange = e => {
    onChange(e.target.value);
  };

  const { t } = useTranslation();
  return (
    <>
      <div className={css.navigation}>
        <NavLink to="/" className={addLinksClasses} onClick={toggleMenu}>
          {t('navigation.home')}
        </NavLink>

        <NavLink to="/movies" className={addLinksClasses} onClick={toggleMenu}>
          {t('navigation.movies')}
        </NavLink>

        <NavLink to="/random" className={addLinksClasses}>
          {t('navigation.random')}
        </NavLink>
      </div>

      <select
        value={value}
        onChange={handleLangChange}
        className={css.langSelect}
      >
        <option name="lang" value="en-US" className={css.langOption}>
          EN
        </option>
        <option name="lang" value="uk-UA" className={css.langOption}>
          UA
        </option>
      </select>
    </>
  );
}
