import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace this with your actual backend URL

const api = axios.create({
  baseURL: BASE_URL,
});

export const generateDatabase = async (userId, tableName, columns) => {
  const data = {
    userId,
    dbName: tableName,
    columns: columns.map((column) => ({
      name: column.columnName,
      type: column.columnType,
    })),
  };

  try {
    const response = await api.post('/generate-db', data);
    return response.message;
  } catch (error) {
    console.error('Error generating database:', error);
    throw error;
  }
};
