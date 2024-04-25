
import {api,handleRequest} from '../utilities/funciones'

export const handleEditarUsuario = async (usuarioData, UsuarioId) => {
  return handleRequest('put', `usuario/updateUsuario/${UsuarioId}`, usuarioData,api);
};
export const handleEliminarUsuario = async (UsuarioId) => { 
  return handleRequest('delete', `usuario/deleteUsuario/${UsuarioId}`, null,api);
};
export const handleInsertarUsuario = async (data) => {
  return handleRequest('post', 'usuario/addUsuario', data,api);
};
