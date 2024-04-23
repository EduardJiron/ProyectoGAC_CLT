
import { handleRequest,api } from '../utilities/funciones'



export const handleInsertarCarrera = async (data) => {
  return handleRequest('post', 'carrera/addcarrera', data,api);
};

export const handleEditarCarrera = async (carreraData, facultadId) => {
  return handleRequest('put', `carrera/updatecarrera/${facultadId}`, carreraData,api);
};

export const handleEliminarCarrera = async (carreraId) => { 
  return handleRequest('delete', `carrera/deletecarrera/${carreraId}`,null,api);
};

