import axios from 'axios';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjRkZmUyYzM0NDRiYTkyMjY0OTFjY2U3MWIzYmJlZCIsIm5iZiI6MTc0MDQ4MzM0Ny40MjU5OTk5LCJzdWIiOiI2N2JkYWIxM2ViOWQ3NWE2MTM1OWEyOTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-V_1rcFNMHYZIIl8_3RO3PV_DbuQ_lKflaKB-I5Dsx4';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;

export async function getTrendingMovies() {
  const response = await axios.get('trending/movie/day');
  return response.data;
}

export async function getMovieById(movieId) {
  const response = await axios.get(`movie/${movieId}`);
  return response.data;
}

export async function getMovieByName(query, page) {
  const response = await axios.get('search/movie', {
    params: { query, page },
  });
  return response.data;
}

export async function getMovieCast(movieId) {
  const response = await axios.get(`movie/${movieId}/credits`);
  return response.data;
}

export async function getMoviesReviews(movieId, page) {
  const response = await axios.get(`movie/${movieId}}/reviews`, {
    params: { page },
  });
  return response.data;
}
