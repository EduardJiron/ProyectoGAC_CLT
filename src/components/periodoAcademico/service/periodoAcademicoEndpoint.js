import axios from "axios";


export const handleInsertarPeriodoAcademico = async (data) => {
  try {
  
    await axios.post(
    
      "http://192.168.1.16:3001/api/v1/Periodo_academico/addPeriodo_Academico",
      data
    );
    console.log("PeriodoAcademico añadida exitosamente");
    return true;
  } catch (error) {
    console.error("Error al añadir PeriodoAcademico:", error);
    return false;
  }
};

export const handleEditarPeriodoAcademico = async (PeriodoAcademicoData, dataId) => {
  try {
    console.log("PeriodoAcademico a editar:", PeriodoAcademicoData);
    await axios.put(
      "http://192.168.1.16:3001/api/v1/periodo_academico/updateperiodo_academico/" + dataId,
      PeriodoAcademicoData
    );

    console.log("PeriodoAcademico editada exitosamente");
    return true;
  } catch (error) {
    console.error("Error al editar PeriodoAcademico:", error);
    return false;
  }
};

export const handleEliminarPeriodoAcademico = async (PeriodoAcademicoId) => { 
  try {
    await axios.delete(
      "http://192.168.1.16:3001/api/v1/periodo_academico/deletePeriodo_academico/" + PeriodoAcademicoId );
    console.log("PeriodoAcademico eliminada exitosamente");
    return true;
  }
  catch (error) {
    console.error("Error al eliminar PeriodoAcademico:", error);
    return false;
  }
}
