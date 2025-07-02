import axios from 'axios';

const API_KEY = process.env.REACT_APP_PLANT_API;  // Make sure your API key is stored in the .env file
const BASE_URL = 'https://perenual.com/api/species-list?';  // Correct API endpoint for species list

export const getPlants = async (searchTerm = '') => {
  try {
    console.log('API Key:', API_KEY);
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,    // Pass the API key here
        q: searchTerm,   // Pass the search term for filtering
      },
    });
    return response.data.data;  // Return the plant data array from the response
  } catch (error) {
    console.error('Error fetching plants:', error);
    throw error;
  }
};
