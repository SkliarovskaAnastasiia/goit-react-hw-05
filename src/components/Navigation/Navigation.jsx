import { IoFilmOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';
import { useMediaQuery } from 'react-responsive';

function addClasses({ isActive }) {
  return clsx(css.navLink, isActive && css.activeLink);
}

export default function Navigation({ value, onChange }) {
  const handleLangChange = e => {
    onChange(e.target.value);
  };

  const isMobile = useMediaQuery({ maxWidth: 660 });

  console.log(isMobile);
  return (
    <header className={css.header}>
      <Link to="/" className={css.logo}>
        <p>FilmFinder</p> <IoFilmOutline size={22} color="#747bff" />
      </Link>

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
    </header>
  );
}
