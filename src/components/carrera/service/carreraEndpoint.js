import axios from "axios";


export const handleInsertarCarrera = async (data) => {
  try {
  
    await axios.post(
    
      "http://192.168.1.16:3001/api/v1/carrera/addcarrera",
      data
    );
    console.log("carrera añadida exitosamente");
    return true;
  } catch (error) {
    console.error("Error al añadir carrera:", error);
    return false;
  }
};

export const handleEditarCarrera = async (carreraData, facultadId) => {
  try {
    console.log("Carrera a editar:", carreraData);
    await axios.put(
      "http://192.168.1.16:3001/api/v1/carrera/updatecarrera/" + facultadId,
      carreraData
    );

    console.log("Carrera editada exitosamente");
    return true;
  } catch (error) {
    console.error("Error al editar carrera:", error);
    return false;
  }
};

export const handleEliminarCarrera = async (carreraId) => { 
  try {
    await axios.delete(
      "http://192.168.1.16:3001/api/v1/carrera/deletecarrera/" + carreraId );
    console.log("Carrera eliminada exitosamente");
    return true;
  }
  catch (error) {
    console.error("Error al eliminar carrera:", error);
    return false;
  }
}
