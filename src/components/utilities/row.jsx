import React from "react";
import Column from "./colum";

const Row = ({ rowData, onContextMenu }) => {
  const columnsToExclude = [ "estado"]; 

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
