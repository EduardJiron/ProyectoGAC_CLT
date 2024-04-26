import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {handleInsertarCalificacion,handleEditarCalificacion } from "../service/calificacionesEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";



const FormEditarCalificacion = ({ Calificacion, Periodo,estudiante,clase ,isEditing, onCancel,onRecargarDatos,onSnackbar}) => {
 
    console.log(estudiante);
  const [formData, setFormData] = useState({
        Calificacion: "",
        id_estudiante: "",
        id_clase: "",
        id_periodo: 2,
  });
 
  useEffect(() => {
    if (isEditing) {
      setFormData({
        Calificacion: undefined,
        id_estudiante: Calificacion.id_estudiante,
        id_clase: clase || "",
        id_periodo: 2,
      });
    } else {
      setFormData({
        Calificacion:undefined,
        id_estudiante: "",
        id_clase: clase,
        id_periodo: 2,
      });
    }
  }, [Calificacion, isEditing, Periodo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

const handleEstuidanteChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, id_estudiante: value });
    };

  const handleSubmit = async () => {
    try {

        switch(true){
            case formData.id_clase === "":
                onSnackbar('error', 'Seleccione una clase');
                return;
            case formData.id_estudiante === "":
                onSnackbar('error', 'Seleccione un estudiante');
                return;
            case formData.id_periodo === "":
                onSnackbar('error', 'Seleccione un periodo');
                return;
            case formData.Calificacion === "":
                onSnackbar('error', 'Ingrese una calificacion');
                return;
        }



        if(isEditing){
          const success = await handleEditarCalificacion(formData, Calificacion.id_calificacion);
          if (success) {
            onRecargarDatos();
            onSnackbar('success', 'Calificacion editada exitosamente');
            onCancel();
          } else {
            console.error("Error al editar calificacion");
          }
        }
        else{
          const success = await handleInsertarCalificacion(formData);
          console.log(formData)
          if (success) {
            onRecargarDatos();
            onSnackbar('success', 'Calificacion añadida exitosamente');
            onCancel();
          } else {
            console.error("Error al añadir calificacion");
          }
        }

    } catch (error) {
      console.error("Error al editar calificacion:", error);
    }
  };

  return (
    <Dialog open 
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    
     <DialogContent>
     <div style={{ display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center',gap:'1vw' }}>
     {isEditing ? <Typography variant="h5">Editar Calificacion</Typography> : <Typography variant="h5">Añadir Calificacion</Typography>}
     <Typography variant="h6">Estudiante</Typography>
      <TextField
      sx={{width:'100%'}}
        select
        
        name="id_estudiante"
        label="Estudiante"
        value={formData.id_estudiante}
        onChange={handleEstuidanteChange}
        helperText="Seleccione un estudiante"
        >

        {estudiante.map((estudiante) => (
            <MenuItem key={estudiante.id_estudiante} value={estudiante.id_estudiante}>
                {estudiante.nombre} {estudiante.apellido}
            </MenuItem>
            ))}

        </TextField>
    
<Typography variant="h6">Calificacion</Typography>
     <TextField
     error={formData.Calificacion === ""}

     helperText={formData.Calificacion === "" ? "Campo requerido" : ""}
      className="form-control"

        name="calificacion"
        value={formData.Calificacion}
        onChange={handleChange}
      />
   
     
      </div>
      <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'2vw'}}>
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

export default FormEditarCalificacion;
