import axios from "axios";


export const handleInsertarFacultad = async (data) => {
  try {
  
    await axios.post(
    
      "http://192.168.1.16:3001/api/v1/facultad/addfacultad",
      data
    );
    console.log("facultad añadida exitosamente");
    return true;
  } catch (error) {
    console.error("Error al añadir facultad:", error);
    return false;
  }
};

export const handleEditarFacultad = async (data, dataID) => {
  try {
    
    await axios.put(
      "http://192.168.1.16:3001/api/v1/facultad/updateFacultad/" + dataID,
      data
    );
    console.log("facultad editada exitosamente");
    return true;
  } catch (error) {
    console.error("Error al editar facultad:", error);
    return false;
  }
};

export const handleEliminarFacultad = async (dataID) => { 
  try {
    await axios.delete(
      "http://192.168.1.16:3001/api/v1/facultad/deletefacultad/" + dataID );
    console.log("facultad eliminada exitosamente");
    return true;
  }
  catch (error) {
    console.error("Error al eliminar facultad:", error);
    return false;
  }
}
