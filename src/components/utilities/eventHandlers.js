export const handleChangePage = (event, newPage, setPage) => {
    setPage(newPage);
  };
  
  export const handleFilterChange = (event, setFilterValue) => {
    setFilterValue(event.target.value);
  };
  
  export const handleContextMenu = (event, row, setAnchorPosition, setSelectedRow) => {
    event.preventDefault();
    setAnchorPosition({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
    setSelectedRow(row);
  };
  
  export const handleCancelarEdicion = (setEditingModel) => {
    setEditingModel(null);
  };
  export const handleCancelarInsercion = (setEditingModel) => {
    setEditingModel(null);
  };
  export const handleCancelarEliminacion = (setDeletedModel) => {
    setDeletedModel(null);
  };
  
  export const handleEditarClick = (selectedRow, setEditingModel, handleCloseMenu) => {
    if (selectedRow) {
      const Model = selectedRow;
      setEditingModel(Model);
    }
    handleCloseMenu();
  };

  export const handleInsertarClick = (model,setAddModel, handleCloseMenu) => {
    setAddModel(model);
    
    handleCloseMenu();


  };
  
  export const handleEliminarClick = (selectedRow, setDeletedModel, handleCloseMenu) => {
    if (selectedRow) {
      const Model = selectedRow;
      setDeletedModel(Model);
    }
    handleCloseMenu();
  };
  