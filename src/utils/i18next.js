import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'en-US': {
    translation: {
      navigation: {
        home: 'Home',
        movies: 'Movies',
      },

      homePage: {
        title: 'Trending Today',
      },

      moviePage: {
        notFound: 'Sorry, nothing found',
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
      },

      reviews: { noReviews: 'We don&apos;t have any reviews for this movie' },

      cast: { noCast: 'We don&apos;t have any information about cast' },
    },
  },

  'uk-UA': {
    translation: {
      navigation: {
        home: 'Головна',
        movies: 'Фільми',
      },

      homePage: {
        title: 'У тренді',
      },

      moviePage: {
        notFound: 'Нічого не знайдено',
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
      },

      reviews: { noReviews: 'До цього філму ще немає жодної рецензії' },

      cast: { noCast: 'Немає жодної інформації про акторський склад' },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en-US',
    resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
