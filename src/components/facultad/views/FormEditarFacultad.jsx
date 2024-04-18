import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "/src/assets/css/sidebar.css";
import { handleEditarFacultad } from "../service/facultadEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";



const FormEditarFacultad = ({ Facultad, onCancel,onRecargarDatos,onSnackbar}) => {
  const [formData, setFormData] = useState({
    nombre: Facultad.nombre,
    descripcion: Facultad.descripcion,
  });
 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async () => {
    try {
      switch (true) {
        case formData.nombre === "":
          onSnackbar("error", "Nombre es requerido");
          return;
        case formData.descripcion === "":
          onSnackbar("error", "Descripción es requerida");
          return;
        default:
          break;
      }
      const success = await handleEditarFacultad(
        formData,
        Facultad.id_facultad
      );
      if (success) {
        onRecargarDatos();
        onSnackbar('success','Facultad editada exitosamente');
        onCancel();
        
      } else {
        console.error("Error al editar facultad");
      }
    } catch (error) {
      console.error("Error al editar Facultad:", error);
    }
  };

  return (
    <Dialog open 
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    
     <DialogContent>
     <div style={{ display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center',gap:'1vw' }}>
     <Typography variant="subtitle1" component="div">
        Editar Facultad
      </Typography>
     <TextField
     error={formData.nombre === ""}
     helperText={formData.nombre === "" ? "Campo requerido" : ""}
      className="form-control"
        name="nombre"
        label="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
      <TextField
        error={formData.descripcion === ""}
        helperText={formData.descripcion === "" ? "Campo requerido" : ""}
        name="descripcion"
        label="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />
  
      </div>
      <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'2vw'}}>
      <Button
      
        color="secondary"
      onClick={handleSubmit}>Editar</Button>
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

export default FormEditarFacultad;
