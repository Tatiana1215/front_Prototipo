import axios from 'axios';


const token = JSON.parse(localStorage.getItem('auth')); 
 
const apiClient = axios.create({
  baseURL: 'http://localhost:4500/api',
  // baseURL: 'https://etapas-practicas-ep.onrender.com',
  headers: {
    "token": token.token
  }
});
export default apiClient;

// import axios from 'axios';

// const token = localStorage.getItem('token') || '';

// const apiClient = axios.create({
//     // baseURL: 'http://localhost:4500/api',
//     baseURL: 'https://etapas-practicas-ep.onrender.com/api',
//     headers: {
//         "token": token 
//     }
// });

// apiClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token'); 
//     if (token) {
//         config.headers['token'] = token; 
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// export default apiClient;