// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getAllAPIUrls = async (userId, tableName) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-api-urls/${userId}/${tableName}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching URLS data:', error);
    throw error;
  }
};
