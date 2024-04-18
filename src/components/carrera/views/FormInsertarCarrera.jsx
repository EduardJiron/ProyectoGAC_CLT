import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "/src/assets/css/sidebar.css";
import { handleInsertarCarrera } from "../service/carreraEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";



const FormInsertarCarrera = ({onCancel,facultades,onRecargarDatos,onSnackbar}) => {
  
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    });
  
    console.log(formData)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        };

        const handleFacultadChange = (event) => {
          const { value } = event.target;
          setFormData({ ...formData, id_facultad: value });
        };
      


  const handleSubmit = async () => {
    try {
      const success = await handleInsertarCarrera(
        formData
      );
      if (success) {
        onRecargarDatos();
        onSnackbar('success','Carrera Añadida exitosamente');
        onCancel();
        
      } else {
        console.error("Error al Añadir Carerra");
      }
    } catch (error) {
      console.error("Error al Añadir Carrera:", error);
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
        Añadir carrera
      </Typography>
     <TextField
      className="form-control"
        name="nombre"
        label="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
      <TextField

        name="descripcion"
        label="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />
       <TextField
      sx={{width:220}}
        select
        name="id_facultad"
        label="Facultad"
        value={formData.id_facultad}
        onChange={handleFacultadChange}
      >
        {facultades.map((facultad) => (
          <MenuItem key={facultad.id_facultad} value={facultad.id_facultad}>
            {facultad.nombre}
          </MenuItem>
        ))}
      </TextField>
  
      </div>
      <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'2vw'}}>
      <Button
      
        color="secondary"
      onClick={handleSubmit}>Añadir</Button>
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

export default FormInsertarCarrera;
