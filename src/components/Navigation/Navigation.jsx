import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

function addClasses({ isActive }) {
  return clsx(css.navLink, isActive && css.activeLink);
}

export default function Navigation() {
  return (
    <header className={css.header}>
      <NavLink to="/" className={addClasses}>
        Home
      </NavLink>
      <NavLink to="/movies" className={addClasses}>
        Movies
      </NavLink>
    </header>
  );
}
