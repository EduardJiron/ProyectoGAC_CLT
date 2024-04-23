
import {api,handleRequest} from '../utilities/funciones'

export const handleEditarFacultad = async (carreraData, facultadId) => {
  return handleRequest('put', `facultad/updatefacultad/${facultadId}`, carreraData,api);
};
export const handleEliminarFacultad = async (carreraId) => { 
  return handleRequest('delete', `facultad/deletefacultad/${carreraId}`, null,api);
};
export const handleInsertarFacultad = async (data) => {
  return handleRequest('post', 'facultad/addfacultad', data,api);
};
