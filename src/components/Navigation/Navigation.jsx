import { IoFilmOutline } from 'react-icons/io5';
import { IoMenu } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import css from './Navigation.module.css';
import { useState } from 'react';

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
            <>
              <ul className={css.mobMenu}>
                <button
                  type="button"
                  className={css.closeMenu}
                  onClick={toggleMenu}
                >
                  <IoClose size={24} />
                </button>
                <li>
                  <NavLink to="/" className={addClasses} onClick={toggleMenu}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/movies"
                    className={addClasses}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Movies
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
            </>
          )}
        </>
      ) : (
        <>
          <div>
            <NavLink to="/" className={addClasses}>
              Home
            </NavLink>
            <NavLink to="/movies" className={addClasses}>
              Movies
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
