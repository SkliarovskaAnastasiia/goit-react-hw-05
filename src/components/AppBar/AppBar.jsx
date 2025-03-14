import { IoFilmOutline } from 'react-icons/io5';
import { IoMenu } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import css from './AppBar.module.css';
import Navigation from '../Navigation/Navigation';

export default function AppBar({ value, onChange }) {
  const isMobile = useMediaQuery({ maxWidth: 660 });
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);

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
              <div className={css.mobMenu} onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  className={css.closeMenu}
                  onClick={toggleMenu}
                >
                  <IoClose size={24} />
                </button>
                <Navigation
                  value={value}
                  onChange={onChange}
                  toggleMenu={toggleMenu}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <Navigation value={value} onChange={onChange} toggleMenu={toggleMenu} />
      )}
    </header>
  );
}
