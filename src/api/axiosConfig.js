import axios from 'axios';

const api = axios.create({
  baseURL: 'https://catalogo-backend-td68.onrender.com/api/',
  // timeout: 5000,
});

// Base URL para las imágenes servidas por Django
export const MEDIA_BASE = 'https://catalogo-backend-td68.onrender.com';

export default api;

