import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { handleEditarclase,handleInsertarclase} from "../service/claseEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";



const FormEditarclase = ({ clase, horario, isEditing, onCancel,onRecargarDatos,onSnackbar}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    id_horario: ""
  });
 
  useEffect(() => {
    if (isEditing) {
      setFormData({
        nombre: clase.clase|| '',
        descripcion: clase.Descripcion || "",
        id_horario: horario.length > 0 ? horario[0].id_horario : "" ,
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        id_horario: "",
      });
    }
  }, [clase, isEditing, horario]);

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
          const success = await handleEditarclase(formData, clase.id_clase);
          if (success) {
            onRecargarDatos();
            onSnackbar('success', 'clase editada exitosamente');
            onCancel();
          } else {
            console.error("Error al editar clase");
          }
        }
        else{
          const success = await handleInsertarclase(formData);
          if (success) {
            onRecargarDatos();
            onSnackbar('success', 'clase añadida exitosamente');
            onCancel();
          } else {
            console.error("Error al añadir clase");
          }
        }

    } catch (error) {
      console.error("Error al editar clase:", error);
    }
  };

  return (
    <Dialog open 
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    
     <DialogContent>
     <div style={{ display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center',gap:'1vw' }}>
     {isEditing ? <Typography variant="h5">Editar clase</Typography> : <Typography variant="h5">Añadir clase</Typography>}
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
      error={formData.id_horario === ""}
      sx={{width:220}}
        select
        name="id_horario"
        label="horario"
        value={formData.id_horario}
        onChange={handleFacultadChange}
      >
        {horario.map((horario) => (
          <MenuItem key={horario.id_horario} value={horario.id_horario}>
            {horario.hora_inicio}
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

export default FormEditarclase;
