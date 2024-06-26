import React from "react";
import Column from "./colum";

const Row = ({ rowData, onContextMenu }) => {
  const columnsToExclude = [ "estado",'id_facultad','id_carrera','id_periodo','id_clase','id_profesor','id_estudiante','id_materia','id_estudiante','Estado']; 

  return (
    <tr onContextMenu={onContextMenu}>
      {Object.entries(rowData).map(([key, value]) => (
        !columnsToExclude.includes(key) && (
          <Column key={key} value={value} />
        )
      ))}
    </tr>
  );
};

export default Row;
