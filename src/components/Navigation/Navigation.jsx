import { IoFilmOutline } from 'react-icons/io5';
import { IoMenu } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import css from './Navigation.module.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function addClasses({ isActive }) {
  return clsx(css.navLink, isActive && css.activeLink);
}

export default function Navigation({ value, onChange }) {
  const handleLangChange = e => {
    onChange(e.target.value);
  };

  const isMobile = useMediaQuery({ maxWidth: 660 });
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);

  const { t } = useTranslation();
  return (
    <header className={css.header}>
      <Link to="/" className={css.logo}>
        <p>FilmFinder</p> <IoFilmOutline size={22} color="#747bff" />
      </Link>

      {isMobile ? (
        <>
          <button
            type="button"
            onClick={toggleMenu}
            className={css.openMenuBtn}
          >
            <IoMenu size={24} />
          </button>
          {isOpen && (
            <div className={css.mobBackdrop} onClick={toggleMenu}>
              <ul className={css.mobMenu} onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  className={css.closeMenu}
                  onClick={toggleMenu}
                >
                  <IoClose size={24} />
                </button>
                <li>
                  <NavLink to="/" className={addClasses} onClick={toggleMenu}>
                    {t('navigation.home')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/movies"
                    className={addClasses}
                    onClick={toggleMenu}
                  >
                    {t('navigation.movies')}
                  </NavLink>
                </li>
                <li>
                  <select
                    value={value}
                    onChange={handleLangChange}
                    className={css.langSelect}
                  >
                    <option
                      name="lang"
                      value="en-US"
                      className={css.langOption}
                    >
                      EN
                    </option>
                    <option
                      name="lang"
                      value="uk-UA"
                      className={css.langOption}
                    >
                      UA
                    </option>
                  </select>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <NavLink to="/" className={addClasses}>
              {t('navigation.home')}
            </NavLink>
            <NavLink to="/movies" className={addClasses}>
              {t('navigation.movies')}
            </NavLink>
          </div>

          <select
            value={value}
            onChange={handleLangChange}
            className={css.langSelect}
          >
            <option name="lang" value="en-US">
              EN
            </option>
            <option name="lang" value="uk-UA">
              UA
            </option>
          </select>
        </>
      )}
    </header>
  );
}
