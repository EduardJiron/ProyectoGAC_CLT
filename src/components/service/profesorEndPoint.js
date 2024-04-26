
import { api, handleRequest } from '../utilities/funciones'

export const handleEditarProfesor = async (carreraData, profesorId) => {
    return handleRequest('put', `profesor/UpdateProfesor/${profesorId}`, carreraData, api);
};
export const handleEliminarProfesor = async (carreraId) => {
    return handleRequest('delete', `profesor/deleteProfesor/${carreraId}`, null, api);
};
export const handleInsertarProfesor = async (data) => {
    return handleRequest('post', 'profesor/addProfesor', data, api);
};