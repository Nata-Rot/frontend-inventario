import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7097/api', // Puerto de su backend .NET
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;