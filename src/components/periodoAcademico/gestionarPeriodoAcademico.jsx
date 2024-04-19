import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../utilities/table";

import FormInsertarPeriodoAcademico from "./views/InsertarPeriodoAcademico";
import FormEliminarPeriodoAcademico from "./views/EliminarPeriodoAcademico";
import FormEditarPeriodoAcademico from './views/EditarPeriodoAcademico'
import ContextMenu from "../utilities/menuContext";
import CustomSnackbar from "../utilities/CustomSnackbar";
import { handleChangePage, handleFilterChange, handleContextMenu, handleCancelarEdicion, handleCancelarEliminacion, handleEditarClick, handleEliminarClick } from "../utilities/eventHandlers";
import { handlesnapbar } from "../utilities/snackbar";
import { Button } from "@mui/material";

export const GestionarPeriodoAcademico = ({ uri }) => {
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
      const responsePeriodoAcademicos = await axios.get(uri);
      setData(responsePeriodoAcademicos.data.body);
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
      >Añadir Periodo Academico</Button>
      <Table
        filteredData={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        filterValue={filterValue}
        handleChangePage={(event, newPage) => handleChangePage(event, newPage, setPage)}
        handleFilterChange={(event) => handleFilterChange(event, setFilterValue)}
        handleContextMenu={(event, row) => handleContextMenu(event, row, setAnchorPosition, setSelectedRow)}
        columns={["id_PeriodoAcademico", "nombre", "Fecha inicio", "Fecha final"]}
      />
      {addModel && (
        <FormInsertarPeriodoAcademico
          PeriodoAcademico={addModel}
          Periodo={Periodo}
          onCancel={() => handleCancelarEdicion(setAddModel)}
          onRecargarDatos={handleRecargarDatos}
          onSnackbar={(severity, message) => handlesnapbar(severity, message, setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen)}
        />
      )}

      {editingModel && (
        <FormEditarPeriodoAcademico
          PeriodoAcademico={editingModel}
          onCancel={() => handleCancelarEdicion(setEditingModel)}
          onRecargarDatos={handleRecargarDatos}
          onSnackbar={(severity, message) => handlesnapbar(severity, message, setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen)}
        />
      )}
      {
        deletedModel && (
          <FormEliminarPeriodoAcademico
            PeriodoAcademico={deletedModel}
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
