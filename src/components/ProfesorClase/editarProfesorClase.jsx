import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {handleInsertarProfesorClase } from "../service/inscripcionEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";

const FormEditarProfesorClase = ({ ProfesorClase,Profesor,clase,isEditing, onCancel, onRecargarDatos, onSnackbar }) => {
  
  const [formData, setFormData] = useState({
    id_clase: "",
    id_profesor: "",
  });
console.log(ProfesorClase.id_inscripcion);
  useEffect(() => {
    
    if (isEditing) {
      setFormData({
         id_clase :clase.id_clase || "",
          id_profesor: Profesor.id_profesor|| "",

      });
      
    } else {
      setFormData({
        id_clase : "",
        id_profesor: "",
      });
    }
  }, [ProfesorClase, isEditing,Profesor,clase]);

 

const handleProfesorChange = (event) => {

    const { value } = event.target;
    setFormData({ ...formData, id_profesor: value || "" });
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
        case formData.id_profesor === "":
            onSnackbar("error", "Profesor es requerido");
          return;
        default:
          break;
      }
      if (isEditing) {
        const success = await handleInsertarinscripcion(formData, ProfesorClase.id_ProfesorClase);
        
        if (success) {
          onRecargarDatos();
          onSnackbar('success','PeriodoAcademico eliminada exitosamente');
          onCancel();
        } else {
          console.error("Error al editar ProfesorClase");
        }
      } else {
        const success = await handleInsertarProfesorClase(formData);
        if (success) {
          onRecargarDatos();
          onSnackbar('success', 'Clase añadida exitosamente');
          onCancel();
        } else {
        onSnackbar('error', 'El estudiante ya está inscrito en esta clase');
        }
      }
    } catch (error) {
      console.error("Error al editar ProfesorClase:", error);
    }
  };


  return (
    <Dialog open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >

      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1vw' }}>
          {isEditing ? <Typography variant="h5">Editar ProfesorClase</Typography> : <Typography variant="h5">Añadir ProfesorClase</Typography>}
         
        
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
            error={formData.id_profesor === ""}
            sx={{ width: 220 }}
            select
            name="profesor"
            label="Profesor"
            value={formData.id_profesor}
            onChange={handleProfesorChange}
          >
            {Profesor.map((Profesor) => (
              <MenuItem key={Profesor.id_profesor} value={Profesor.id_profesor}>
                {Profesor.nombre}
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

export default FormEditarProfesorClase;
