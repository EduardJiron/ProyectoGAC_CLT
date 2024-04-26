import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api/v1/",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  }
});
export const configToken =()=>{
  return {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  }

}


 export const handleRequest = async (method, url, data,api) => {
  try {
    await api[method](url, data);
    console.log(`${method.toUpperCase()} exitoso en ${url}`);
    return true;
  } catch (error) {
    console.error(`Error al ${method.toLowerCase()} en ${url}:`, error);
    return false;
  }
};