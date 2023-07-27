// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getAllTablesData = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-tables/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tables data:', error);
    throw error;
  }
};
