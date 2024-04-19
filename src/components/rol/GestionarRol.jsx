import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../utilities/table";



import ContextMenu from "../utilities/menuContext";
import CustomSnackbar from "../utilities/CustomSnackbar";
import { handleChangePage, handleFilterChange, handleContextMenu, handleCancelarEdicion, handleCancelarEliminacion, handleEditarClick, handleEliminarClick } from "../utilities/eventHandlers";
import { handlesnapbar } from "../utilities/snackbar";
import { Button } from "@mui/material";

export const GestionarRol = ({ uri }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filterValue, setFilterValue] = useState("");
  const [anchorPosition, setAnchorPosition] = useState({ mouseX: null, mouseY: null });
  const [selectedRow, setSelectedRow] = useState(null);
  const [addModel, setAddModel] = useState(null);
  const [editingModel, setEditingModel] = useState(null);
  const [deletedModel, setDeletedModel] = useState(null);
  const [Periodo, setPeriodo] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      if (uri) {
        try {
          
          const response = await axios.get(uri);
          const responsePeriodo = await axios.get("http://192.168.1.16:3001/api/v1/rol/getallrol");
          setPeriodo(responsePeriodo.data.body);
          setData(response.data.body);
          setFilteredData(response.data.body);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.error('uri no definida');
      }
    };

    fetchData();
  }, [uri]);

  useEffect(() => {
    const filtered = Array.isArray(data) ? data.filter((element) => {
      if(filterValue === "") return true;
      return Object.keys(element).some((key) => {
        if (element[key] === null) return false;
        return element[key].toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    }) : [];
  
    setFilteredData(filtered);
    setPage(1);
  }, [data, filterValue]);

  const handleRecargarDatos = async () => {
    try {
      const responseRols = await axios.get(uri);
      setData(responseRols.data.body);
    } catch (error) {
      console.error("Error al recargar datos:", error);
    }
  };
  
  return (
    <>
      <div
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
        <Button
        color="secondary"
        variant="contained"
        onClick={() => setAddModel(true)}
        sx={{ alignSelf: 'end', marginRight: '8vw' }}
      >Añadir rol</Button>
      <Table
        filteredData={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        filterValue={filterValue}
        handleChangePage={(event, newPage) => handleChangePage(event, newPage, setPage)}
        handleFilterChange={(event) => handleFilterChange(event, setFilterValue)}
        handleContextMenu={(event, row) => handleContextMenu(event, row, setAnchorPosition, setSelectedRow)}
        columns={["id_Rol", "nombre", "Descripcion"]}
      />
      {addModel && (
        <FormInsertarRol
          Rol={addModel}
          Periodo={Periodo}
          onCancel={() => handleCancelarEdicion(setAddModel)}
          onRecargarDatos={handleRecargarDatos}
          onSnackbar={(severity, message) => handlesnapbar(severity, message, setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen)}
        />
      )}

      {editingModel && (
        <FormEditarRol
          Rol={editingModel}
          onCancel={() => handleCancelarEdicion(setEditingModel)}
          onRecargarDatos={handleRecargarDatos}
          onSnackbar={(severity, message) => handlesnapbar(severity, message, setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen)}
        />
      )}
      {
        deletedModel && (
          <FormEliminarRol
            Rol={deletedModel}
            open={true}
            onCancel={() => handleCancelarEliminacion(setDeletedModel)}
            onRecargarDatos={(uri) => handleRecargarDatos(uri, setData)}
            onSnackbar={(severity, message) => handlesnapbar(severity, message, setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen)}
          />
        )
      }
      <ContextMenu
        anchorPosition={anchorPosition}
        onClose={() => setAnchorPosition({ mouseX: null, mouseY: null })}
        onEditarClick={() => handleEditarClick(selectedRow, setEditingModel, () => setAnchorPosition({ mouseX: null, mouseY: null }))}
        onEliminarClick={() => handleEliminarClick(selectedRow, setDeletedModel, () => setAnchorPosition({ mouseX: null, mouseY: null }))}
      />
      <CustomSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
      </div>
    </>
  );
};
