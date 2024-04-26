import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {handleInsertarinscripcion,handleEditarinscripcion } from "../service/inscripcionEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";

const FormEditarEstudianteClase = ({ EstudianteClase, estudiante,clase,isEditing, periodo_academico, onCancel, onRecargarDatos, onSnackbar }) => {
  
  const [formData, setFormData] = useState({
    id_clase: "",
    id_estudiante: "",
    id_periodo: "",
  });
console.log(EstudianteClase.id_inscripcion);
  useEffect(() => {
    
    if (isEditing) {
      setFormData({
       id_clase :clase.id_clase || "",
        id_estudiante: estudiante.id_estudiante|| "",
        id_periodo: periodo_academico.id_periodo|| "",

      });
      
    } else {
      setFormData({
        id_clase : "",
        id_estudiante: "",
        id_periodo: "",
      });
    }
  }, [EstudianteClase, isEditing, periodo_academico, estudiante,clase]);

 

const handleEstudiante = (event) => {
   
    const { value } = event.target;
    setFormData({ ...formData, id_estudiante: value || "" });
  };

  const handleClaseChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, id_clase: value || ""});
  };




  const handleSubmit = async () => {
    try {
      switch (true) {
        case formData.id_clase === "":
            onSnackbar("error", "Clase es requerida");
          return;
        case formData.id_estudiante === "":
            onSnackbar("error", "Estudiante es requerido");
          return;
        case formData.id_periodo === "":
            onSnackbar("error", "Periodo Académico es requerido");
          return;
        default:
          break;
      }
      if (isEditing) {
        const success = await handleEditarinscripcion(formData, EstudianteClase.id_inscripcion);
        
        if (success) {
          onRecargarDatos();
          onSnackbar('success', 'Clase editada exitosamente');
          onCancel();
        } else {
          console.error("Error al editar EstudianteClase");
        }
      } else {
        const success = await handleInsertarinscripcion(formData);
        if (success) {
          onRecargarDatos();
          onSnackbar('success', 'Clase añadida exitosamente');
          onCancel();
        } else {
        onSnackbar('error', 'El estudiante ya está inscrito en esta clase');
        }
      }
    } catch (error) {
      console.error("Error al editar EstudianteClase:", error);
    }
  };



  const handlePeriodoChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, id_periodo: value  || ""});
  };

  return (
    <Dialog open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >

      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1vw' }}>
          {isEditing ? <Typography variant="h5">Editar EstudianteClase</Typography> : <Typography variant="h5">Añadir EstudianteClase</Typography>}
         
        
       
         <TextField
         error={formData.id_clase === ""}
         sx={{ width: 220 }}
         select
         name="clase"
         label="Clase"
         value={formData.id_clase}
         onChange={handleClaseChange}
         >
          {clase.map((clase) => (
            <MenuItem key={clase.id_clase} value={clase.id_clase}>
              {clase.nombre_clase}
            
            </MenuItem>
          ))}
         </TextField>

          <TextField
            error={formData.id_estudiante === ""}
            sx={{ width: 220 }}
            select
            name="estudiante"
            label="Estudiante"
            value={formData.id_estudiante}
            onChange={handleEstudiante}
          >
            {estudiante.map((estudiante) => (
              <MenuItem key={estudiante.id_estudiante} value={estudiante.id_estudiante}>
                {estudiante.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={formData.id_periodo=== ""}
            sx={{ width: 220 }}
            select
            name="periodo"
            label="Periodo Académico"
            value={formData.id_periodo}
            onChange={handlePeriodoChange}
          >
            {periodo_academico.map((periodo_academico) => (
              <MenuItem key={periodo_academico.id_periodo} value={periodo_academico.id_periodo}>
                {periodo_academico.nombre}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2vw' }}>
          <Button
            color="secondary"
            onClick={handleSubmit}>
            {isEditing ? "Editar" : "Añadir"}
          </Button>
          <Button
            color="primary"
            onClick={onCancel} autoFocus>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormEditarEstudianteClase;
