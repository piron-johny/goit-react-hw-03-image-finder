import axios from 'axios';

export const fetchMoviesWithQuery = async searchValue => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=cat&page=1&key=24644022-4984203066fb287d0befab6c3&image_type=photo&orientation=horizontal&per_page=12&q=${searchValue}`
  );
  return response.data.hits;
};
