import axios from "axios";
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "key=24310244-ee4074f763d6520362b30c74e";
const PER_PAGE = 12;

export const apiServices = async ({ searchQuery, page }) => {
  const url = `${BASE_URL}?${API_KEY}&q=${searchQuery}&image_type=photo&per_page=${PER_PAGE}&page=${page}&orientation=horizontal&safesearch=true`;
  const response = await axios.get(url);

  return response.data;
};
