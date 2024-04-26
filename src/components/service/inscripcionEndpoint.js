
import {api,handleRequest} from '../utilities/funciones'

export const handleEditarinscripcion = async (carreraData, estudianteId) => {
  return handleRequest('put', `estudiante/updateinscripcion/${estudianteId}`, carreraData,api);
};
export const handleEliminarinscripcion = async (estudianteId) => { 
  return handleRequest('delete', `estudiante/deleteinscripcion/${estudianteId}`, null,api);
};
export const handleInsertarinscripcion = async (data) => {
  return handleRequest('post', 'estudiante/addinscripcion', data,api);
};

export const handleInsertarProfesorClase = async (data) => {
  return handleRequest('post', 'profesor/addprofesorclase', data,api);
}

export const handleEliminarProfesorClase = async (profesorClaseId) => {
  return handleRequest('delete', `profesor/deleteprofesorclase/${profesorClaseId}`, null,api);
}