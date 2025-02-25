import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <a href="https://www.themoviedb.org/" className={css.footerLink}>
        TMDB API
      </a>
    </footer>
  );
}
