import axios from 'axios';

const backendBaseUrl = process.env.REACT_APP_API_BASE_URL ?? '';

export const apiClient = axios.create({ baseURL: backendBaseUrl, withCredentials: true });
