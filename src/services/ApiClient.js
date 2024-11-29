import apiClient from '../plugins/Axios.js'; 

export async function getData(url, params = {}) {
  try {
    const response = await apiClient.get(url, { params });
    return response.data; 
  } catch (error) {
    console.error('Error en la petición GET:', error);
    throw error;  
  }
}

// Función POST
export async function postData(url, data) {
  try {
    const response = await apiClient.post(url, data);
    return response.data;  
  } catch (error) {
    console.error('Error en la petición POST:', error);
    throw error;
  }
}


export async function putData(url, data) {
  try {
    const response = await apiClient.put(url, data);
    return response.data;  
  } catch (error) {
    console.error('Error en la petición PUT:', error);
    throw error;
  }
}
