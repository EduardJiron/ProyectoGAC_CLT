
import {api,handleRequest} from '../utilities/funciones'

export const handleEditarCalificacion = async (carreraData, estudianteId) => {
  return handleRequest('put', `calificacion/updateCalificacion/${estudianteId}`, carreraData,api);
};
export const handleEliminarinscripcion = async (estudianteId) => { 
  return handleRequest('delete', `estudiante/deleteinscripcion/${estudianteId}`, null,api);
};
export const handleInsertarinscripcion = async (data) => {
  return handleRequest('post', 'estudiante/addinscripcion', data,api);
};

export const handleInsertarCalificacion = async (data) => {
  return handleRequest('post', 'calificacion/addCalificacion', data,api);
}

export const handleEliminardeleteCalificacion = async (profesorClaseId) => {
  return handleRequest('delete', `calificacion/deleteCalificacion/${profesorClaseId}`, null,api);
}