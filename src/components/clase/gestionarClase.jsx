import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../utilities/table";

import ContextMenu from "../utilities/menuContext";
import FormEditarClase from "./FormEditarClase";
import {configToken} from '../utilities/funciones'
import CustomSnackbar from "../utilities/CustomSnackbar";
import { handleChangePage, handleFilterChange, handleContextMenu, handleCancelarEdicion, handleCancelarEliminacion, handleEditarClick, handleEliminarClick } from "../utilities/eventHandlers";
import { handlesnapbar } from "../utilities/snackbar";
import { Button } from "@mui/material";

export const GestionarClase = ({ uri }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filterValue, setFilterValue] = useState("");
  const [anchorPosition, setAnchorPosition] = useState({ mouseX: null, mouseY: null });
  const [selectedRow, setSelectedRow] = useState(null);
  const [addModel, setAddModel] = useState(null);
  const [editingModel, setEditingModel] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deletedModel, setDeletedModel] = useState(null);
  const [horario, setHorario] = useState([]);
  const [periodo_academico, setPeriodo_academico] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      if (uri) {
        console.log(localStorage.getItem('profesor'))   ;
        try {
          const response = await axios.get(uri,configToken());
          const responseHorario = await axios.get("http://localhost:3001/api/v1/horario/allhorario",configToken());
          const periodo_academico = await axios.get("http://localhost:3001/api/v1/periodo_academico/allperiodo_academico",configToken());
          setPeriodo_academico(periodo_academico.data.body);
          console.log(periodo_academico.data.body)
          setHorario(responseHorario.data.body);
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
      const responseClase = await axios.get(uri,configToken());
      setData(responseClase.data.body);
    
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
        onClick={() => {setEditingModel(true),setIsEditing(false)}}
        sx={{ alignSelf: 'end', marginRight: '8vw' }}
      >Añadir Clase</Button>
      <Table
        filteredData={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        filterValue={filterValue}
        handleChangePage={(event, newPage) => handleChangePage(event, newPage, setPage)}
        handleFilterChange={(event) => handleFilterChange(event, setFilterValue)}
        handleContextMenu={(event, row) => handleContextMenu(event, row, setAnchorPosition, setSelectedRow)}
        columns={[ "nombre", "descripcion", "cod_clase",'Horario','fecha inicio','fecha_final']}
      />

      {editingModel && (
        <FormEditarClase
          clase={editingModel}
          isEditing={isEditing}
          horario={horario}
          periodo_academico={periodo_academico}
          onCancel={() => handleCancelarEdicion(setEditingModel)}
          onRecargarDatos={handleRecargarDatos}
          onSnackbar={(severity, message) => handlesnapbar(severity, message, setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen)}
        />
      )}
      {
        deletedModel && (
          <FormEliminarCarrera
            carrera={deletedModel}
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
        onEditarClick={() => {handleEditarClick(selectedRow, setEditingModel, () => setAnchorPosition({ mouseX: null, mouseY: null })),setIsEditing(true)}}
        onEliminarClick={() => {handleEliminarClick(selectedRow, setDeletedModel, () => setAnchorPosition({ mouseX: null, mouseY: null }))}}
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
