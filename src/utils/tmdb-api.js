import axios from 'axios';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjRkZmUyYzM0NDRiYTkyMjY0OTFjY2U3MWIzYmJlZCIsIm5iZiI6MTc0MDQ4MzM0Ny40MjU5OTk5LCJzdWIiOiI2N2JkYWIxM2ViOWQ3NWE2MTM1OWEyOTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-V_1rcFNMHYZIIl8_3RO3PV_DbuQ_lKflaKB-I5Dsx4';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;

export async function getTrendingMovies(language) {
  const response = await axios.get('trending/movie/day', {
    params: { language },
  });
  return response.data;
}

export async function getMovieById(movieId, language) {
  const response = await axios.get(`movie/${movieId}`, {
    params: { language },
  });
  return response.data;
}

export async function getTopRatedMovies(page, language) {
  const response = await axios.get('movie/top_rated', {
    params: { page, language },
  });
  return response.data;
}

export async function getMovieByName(query, page, language) {
  const response = await axios.get('search/movie', {
    params: { query, page, language },
  });
  return response.data;
}

export async function getMovieCast(movieId, language) {
  const response = await axios.get(`movie/${movieId}/credits`, {
    params: { language },
  });
  return response.data;
}

export async function getMoviesReviews(movieId, language) {
  const response = await axios.get(`movie/${movieId}}/reviews`, {
    params: { language },
  });
  return response.data;
}
