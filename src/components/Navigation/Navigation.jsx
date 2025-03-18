import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LangContext } from '../langContext';
import { use } from 'react';
import clsx from 'clsx';
import css from './Navigation.module.css';

function addLinksClasses({ isActive }) {
  return clsx(css.navLink, isActive && css.activeLink);
}

export default function Navigation({ toggleMenu }) {
  const { lang, changeLang } = use(LangContext);

  const handleLangChange = e => {
    changeLang(e.target.value);
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

        <NavLink to="/random" className={addLinksClasses} onClick={toggleMenu}>
          {t('navigation.random')}
        </NavLink>
      </div>

      <select
        value={lang}
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
