import { Pagination, TextField } from "@mui/material";
import Row from "./row";

const Table = ({
  filteredData,
  page,
  rowsPerPage,
  filterValue,
  handleChangePage,
  handleFilterChange,
  handleContextMenu,
  columns,
}) => {
  const totalElements = filteredData.length;

  const renderBody = () => {
    if (totalElements === 0) {
      return (
        <tr>
        <td colSpan={columns.length}>No hay datos disponibles</td>
        </tr>
      );
    }
  
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
  
    
    if (!Array.isArray(paginatedData)) {
      return null;
    }
  
    return paginatedData.map((element, index) => (
      <Row key={index} rowData={element} onContextMenu={(event) => handleContextMenu(event, element)} />
    ));
  };
  
  const renderHeader = () => {
    const columnsToExclude = ["estado"]; 
    return columns.map((column, index) => (
      !columnsToExclude.includes(column.toLowerCase()) && (
        <th key={index}>
          {column.toUpperCase()}
        </th>
      )
    ));
  };
  
  return (
    <div style={{display:'flex', flexDirection:'column', width:'80%'}}>
      <TextField 
        label="Buscar"
        variant="standard"
        value={filterValue}
        onChange={handleFilterChange}
        style={{width:'20%'}}
      
      />

      <table style={{}}>
        <thead style={{textAlign: 'justify',backgroundColor:'black',color:'white'}}>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(totalElements / rowsPerPage)}
          shape="rounded"
          variant="outlined"
          page={page}
          onChange={handleChangePage}
          color="secondary"
        />
        
      </div>
    </div>
  );
};

export default Table;
