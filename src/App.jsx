import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import AppBar from './components/AppBar/AppBar';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviePage/MoviesPage'));
const RandomMoviePage = lazy(() =>
  import('./pages/RandomMoviePage/RandomMoviePage')
);
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);

function App() {
  const [lang, setLang] = useState(() => {
    const langVal = localStorage.getItem('lang');
    if (langVal !== null) return langVal;

    return 'en-US';
  });

  const { i18n } = useTranslation();

  const handleChangeLang = selectedLang => {
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('lang', selectedLang);
  };

  return (
    <>
      <AppBar value={lang} onChange={handleChangeLang} />

      <main id="main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/movies" element={<MoviesPage lang={lang} />} />
            <Route path="/random" element={<RandomMoviePage lang={lang} />} />
            <Route
              path="/movies/:movieId"
              element={<MovieDetailsPage lang={lang} />}
            >
              <Route path="cast" element={<MovieCast lang={lang} />} />
              <Route path="reviews" element={<MovieReviews lang={lang} />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Toaster />

      <Footer />
    </>
  );
}

export default App;
