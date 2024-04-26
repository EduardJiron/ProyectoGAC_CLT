import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { handleEditarCarrera,handleInsertarCarrera} from "../service/carreraEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";



const FormEditarCarrera = ({ carrera, facultades, isEditing, onCancel,onRecargarDatos,onSnackbar}) => {
 
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    id_facultad: ""
  });
 
  useEffect(() => {
    if (isEditing) {
      setFormData({
        nombre: carrera.Carrera|| '',
        descripcion: carrera.Descripcion || "",
        id_facultad: facultades.length > 0 ? facultades[0].id_facultad : "" ,
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        id_facultad: "",
      });
    }
  }, [carrera, isEditing, facultades]);

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

      switch (true) {
        case formData.nombre === "":
          onSnackbar("error", "Nombre es requerido");
          return;
        case formData.descripcion === "":
          onSnackbar("error", "Descripción es requerida");
          return;
        case formData.id_facultad === "":
          onSnackbar("error", "Facultad es requerida");
          return;
        default:
          break;
      }
        if(isEditing){
          const success = await handleEditarCarrera(formData, carrera.id_carrera);
          if (success) {
            onRecargarDatos();
            onSnackbar('success', 'Carrera editada exitosamente');
            onCancel();
          } else {
            console.error("Error al editar carrera");
          }
        }
        else{
          const success = await handleInsertarCarrera(formData);
          if (success) {
            onRecargarDatos();
            onSnackbar('success', 'Carrera añadida exitosamente');
            onCancel();
          } else {
            console.error("Error al añadir carrera");
          }
        }

    } catch (error) {
      console.error("Error al editar carrera:", error);
    }
  };

  return (
    <Dialog open 
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    
     <DialogContent>
     <div style={{ display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center',gap:'1vw' }}>
     {isEditing ? <Typography variant="h5">Editar Carrera</Typography> : <Typography variant="h5">Añadir Carrera</Typography>}
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
      <TextField
      error={formData.id_facultad === ""}
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

export default FormEditarCarrera;
