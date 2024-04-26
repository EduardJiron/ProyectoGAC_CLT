import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../utilities/table";
import FormEditarCalificacion from "./editarCalificaciones";
import ContextMenu from "../utilities/menuContext";
import {configToken} from '../utilities/funciones'
import CustomSnackbar from "../utilities/CustomSnackbar";
import FormEliminarCalificacion from "./eliminarCalificacion";
import { handleChangePage, handleFilterChange, handleContextMenu, handleCancelarEdicion, handleCancelarEliminacion, handleEditarClick, handleEliminarClick } from "../utilities/eventHandlers";
import { handlesnapbar } from "../utilities/snackbar";
import { Button } from "@mui/material";

export const GestionarCal = ({ uri,token,id_clase }) => {
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
  const [periodo, setperiodo] = useState([]);
  const [estudiante, setEstudiante] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
     
        
        try {
          const response = await axios.get(`http://192.168.1.16:3001/api/v1/calificacion/getCalificacionesByClase/${id_clase}`, configToken());
          const resonseEstudiante = await axios.get(`http://192.168.1.16:3001/api/v1/estudiante/getEstudianteByclase/${id_clase}`,configToken());
          setEstudiante(resonseEstudiante.data.body);
          const responseperiodo = await axios.get("http://192.168.1.16:3001/api/v1/periodo_academico/allperiodo_academico",configToken());
          setperiodo(responseperiodo.data.body);
          setData(response.data.body);
          setFilteredData(response.data.body);
        } catch (err) {
          console.log(err);
        }
    
    };

    fetchData();
  }, []);

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
      const response = await axios.get(`http://192.168.1.16:3001/api/v1/calificacion/getCalificacionesByClase/${id_clase}`, configToken());
      setData(response.data.body);
      setFilteredData(response.data.body);
    }
    catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <div
      style={{ width: '50vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
        <Button
        color="secondary"
        variant="contained"
        onClick={() => {setEditingModel(true),setIsEditing(false)}}
        sx={{ alignSelf: 'end', marginRight: '8vw' }}
      >Añadir Calificacion</Button>
      <Table
        filteredData={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        filterValue={filterValue}
        handleChangePage={(event, newPage) => handleChangePage(event, newPage, setPage)}
        handleFilterChange={(event) => handleFilterChange(event, setFilterValue)}
        handleContextMenu={(event, row) => handleContextMenu(event, row, setAnchorPosition, setSelectedRow)}
        columns={["id", "Nombre", "Nota","Periodo academico"]}
      />

      {editingModel && (
        <FormEditarCalificacion
          Calificacion={editingModel}
          clase={id_clase}
          estudiante={estudiante}
          isEditing={isEditing}
          periodo={periodo}
          onCancel={() => handleCancelarEdicion(setEditingModel)}
          onRecargarDatos={handleRecargarDatos}
          onSnackbar={(severity, message) => handlesnapbar(severity, message, setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen)}
        />
      )}
      {
        deletedModel && (
          <FormEliminarCalificacion
            Calificacion={deletedModel}
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
