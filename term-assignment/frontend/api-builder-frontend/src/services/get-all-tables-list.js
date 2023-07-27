import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getAllTablesList = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-tables-list/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tables data:', error);
    throw error;
  }
};
