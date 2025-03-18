import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'en-US': {
    translation: {
      navigation: {
        home: 'Home',
        movies: 'Movies',
        random: 'Random movie',
      },

      homePage: {
        title: 'Trending Today',
      },

      hero: {
        title: 'Looking for a movie to watch tonight',
        clickBtn: 'Click here',
      },

      moviePage: {
        notFound: 'Sorry, nothing found',
        formPlaceholder: 'Search...',
        selectPlaceholder: 'All genres',
      },

      randomPage: {
        generateBtn: 'Generate movie',
        seeMore: 'See more',
      },

      movieDetailsPage: {
        backlink: 'Go back',
        reviews: 'Reviews',
        cast: 'Cast',
      },

      movieDetails: {
        country_one: 'Country',
        country_other: 'Countries',
        genres: 'Genres',
        runtime: 'Runtime',
        avarage: 'Average',
        overview: 'Overview',
        trailer: 'Whatch trailer',
      },

      reviews: { noReviews: "We don't have any reviews for this movie" },

      cast: { noCast: "We don't have any information about cast" },

      notFound: 'Page not found',
    },
  },

  'uk-UA': {
    translation: {
      navigation: {
        home: 'Головна',
        movies: 'Фільми',
        random: 'Випадковий фільм',
      },

      homePage: {
        title: 'У тренді',
      },

      hero: {
        title: 'Шукаєш що подивитись',
        clickBtn: 'Тицяй тут',
      },

      moviePage: {
        notFound: 'Нічого не знайдено',
        formPlaceholder: 'Пошук...',
        selectPlaceholder: 'Усі жанри',
      },

      randomPage: {
        generateBtn: 'Згенерувати фільм',
        seeMore: 'Дізнатися більше',
      },

      movieDetailsPage: {
        backlink: 'Назад',
        reviews: 'Рецензії',
        cast: 'Актори',
      },

      movieDetails: {
        country_one: 'Країна',
        country_other: 'Країни',
        genres: 'Жанр',
        runtime: 'Тривалість',
        avarage: 'Рейтинг',
        overview: 'Опис',
        trailer: 'Подивитися трейлер',
      },

      reviews: { noReviews: 'До цього філму ще немає жодної рецензії' },

      cast: { noCast: 'Немає жодної інформації про акторський склад' },

      notFound: 'Сторінку не знайдено',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en-US',
    lng: localStorage.getItem('lang') || 'en-US',
    resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
