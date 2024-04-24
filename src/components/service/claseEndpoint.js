
import { handleRequest,api } from '../utilities/funciones'



export const handleInsertarclase = async (data) => {
  return handleRequest('post', 'clase/addclase', data,api);
};

export const handleEditarclase = async (claseData, facultadId) => {
  return handleRequest('put', `clase/updateclase/${facultadId}`, claseData,api);
};

export const handleEliminarclase = async (claseId) => { 
  return handleRequest('delete', `clase/deleteclase/${claseId}`,null,api);
};

