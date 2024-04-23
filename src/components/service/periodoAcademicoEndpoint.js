
import { handleRequest,api } from '../utilities/funciones'

export const handleEditarPeriodoAcademico = async (carreraData, periodo_academicoId) => {
  return handleRequest('put', `periodo_academico/updateperiodo_academico/${periodo_academicoId}`, carreraData,api);
};

export const handleEliminarPeriodoAcademico = async (carreraId) => { 
  return handleRequest('delete', `periodo_academico/deleteperiodo_academico/${carreraId}`,null,api);
};

export const handleInsertarPeriodoAcademico = async (data) => {
  return handleRequest('post', 'periodo_academico/addperiodo_academico', data,api);
};
