import {api,handleRequest} from '../utilities/funciones'

export const handleEditarEstudiante = async (carreraData, estudianteId) => {
  return handleRequest('put', `estudiante/updateEstudiante/${estudianteId}`, carreraData,api);
};
export const handleEliminarEstudiante = async (carreraId) => { 
  return handleRequest('delete', `estudiante/deleteEstudiante/${carreraId}`, null,api);
};
export const handleInsertarEstudiante = async (data) => {
  return handleRequest('post', 'estudiante/addEstudiante', data,api);
};