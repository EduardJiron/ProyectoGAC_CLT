import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";

const FormEditarclase = ({ clase, horario, carrera,isEditing, periodo_academico, onCancel, onRecargarDatos, onSnackbar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    cod_clase: "",
    id_periodo: "",
    id_horario: "",
    id_carrera: "",
  });

  useEffect(() => {
    console.log(clase);
    if (isEditing) {
      setFormData({
        nombre: clase.nombre_clase || "",
        descripcion: clase.descripcion || "",
        cod_clase: clase.cod_clase || "",
        id_periodo: periodo_academico.length > 0 ? periodo_academico[0].id_periodo : "",
        id_horario: horario.length > 0 ? horario[0].id_horario : "",
        id_carrera: carrera.length > 0 ? carrera[0].id_carrera : "",
      });
      
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        cod_clase: "",
        id_periodo: "",
        id_carrera: "",
      });
    }
  }, [clase, isEditing, horario, periodo_academico]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

const handleHorarioChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, id_horario: value });
  };

const handleCarreraChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, id_carrera: value });
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
        case formData.id_clase === "":
          onSnackbar("error", "Clase es requerida");
          return;
        default:
          break;
      }
      if (isEditing) {
        const success = await handleEditarclase(formData, clase.id_clase);
        console.log(formData);
        if (success) {
          onRecargarDatos();
          onSnackbar('success', 'Clase editada exitosamente');
          onCancel();
        } else {
          console.error("Error al editar clase");
        }
      } else {
        const success = await handleInsertarclase(formData);
        if (success) {
          onRecargarDatos();
          onSnackbar('success', 'Clase añadida exitosamente');
          onCancel();
        } else {
          console.error("Error al añadir clase");
        }
      }
    } catch (error) {
      console.error("Error al editar clase:", error);
    }
  };



  const handlePeriodoChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, id_periodo: value });
  };

  return (
    <Dialog open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >

      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1vw' }}>
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
            error={formData.cod_clase === ""}
            helperText={formData.cod_clase === "" ? "Campo requerido" : ""}
            name="cod_clase"
            label="Código"
            value={formData.cod_clase}
            onChange={handleChange}
          >
          </TextField>
         <TextField
         error={formData.id_horario === ""}
         sx={{ width: 220 }}
         select
         name="horario"
         label="Horario"
         value={formData.id_horario}
         onChange={handleHorarioChange}
         >
          {horario.map((horario) => (
            <MenuItem key={horario.id_horario} value={horario.id_horario}>
              {horario.horario} 
            </MenuItem>
          ))}
         </TextField>

          <TextField
            error={formData.periodo_academico === ""}
            sx={{ width: 220 }}
            select
            name="periodo_academico"
            label="Periodo academico"
            value={formData.id_periodo}
            onChange={handlePeriodoChange}
          >
            {periodo_academico.map((periodo) => (
              <MenuItem key={periodo.id_periodo} value={periodo.id_periodo}>
                {periodo.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={formData.id_carrera === ""}
            sx={{ width: 220 }}
            select
            name="carrera"
            label="Carrera"
            value={formData.id_carrera}
            onChange={handleCarreraChange}
          >
            {carrera.map((carrera) => (
              <MenuItem key={carrera.id_carrera} value={carrera.id_carrera}>
                {carrera.Carrera}
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

export default FormEditarclase;
