import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { handleEditarEstudiante, handleInsertarEstudiante } from "../service/estudianteEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";

const FormEditarEstudiante = ({ Estudiante, onCancel, isEditing, onRecargarDatos, onSnackbar }) => {
  const [formData, setFormData] = useState({
    id_institucional: "",
    nombre: "",
    apellido: "",
    cedula: "",
    correo_intitucional: "",
    fecha_nacimiento: "",
    genero: "",
    direccion: ""
  });
  

  useEffect(() => {
    if (isEditing) {
      setFormData({
        id_institucional: Estudiante.id_institucional || "",
        nombre: Estudiante.nombre || "",
        apellido: Estudiante.apellido || "",
        cedula: Estudiante.cedula || "",
        correo_intitucional: Estudiante.correo_intitucional || "",
        fecha_nacimiento: Estudiante.fecha_nacimiento || "",
        genero: Estudiante.genero || "",
        direccion: Estudiante.direccion || ""

      });
    } else {
      setFormData({
        id_institucional: "",
        nombre: "",
        apellido: "",
        cedula: "",
        correo_intitucional: "",
        fecha_nacimiento: "",
        genero: "",
        direccion: ""
      });
    }
  }, [Estudiante, isEditing]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      switch (true) {
        case formData.id_institucional === "":
          onSnackbar("error", "ID Institucional es requerido");
          return;
        case formData.nombre === "":
          onSnackbar("error", "Nombre es requerido");
          return;
        case formData.apellido === "":
          onSnackbar("error", "Apellido es requerido");
          return;
        case formData.cedula === "":
          onSnackbar("error", "Cedula es requerido");
          return;
        case formData.correo_intitucional === "":
          onSnackbar("error", "Correo Institucional es requerido");
          return;
        case formData.fecha_nacimiento === "":
          onSnackbar("error", "Fecha de Nacimiento es requerido");
          return;
        case formData.genero === "":
          onSnackbar("error", "Genero es requerido");
          return;
        case formData.direccion === "":
          onSnackbar("error", "Direccion es requerido");
          return;
        default:
          break;
      }
      if (isEditing) {
        const success = await handleEditarEstudiante(formData, Estudiante.id_estudiante);
        if (success) {
          onRecargarDatos();
          onSnackbar('success', 'Estudiante editado exitosamente');
          onCancel();
        } else {
          console.error("Error al editar Estudiante");
        }
      } else {
        const success = await handleInsertarEstudiante(formData);
        if (success) {
          onRecargarDatos();
          onSnackbar('success', 'Estudiante añadido exitosamente');
          onCancel();
        } else {
          console.error("Error al añadir Estudiante");
          console.log(formData)
        }
      }
    } catch (error) {
      console.error("Error al editar/agregar Estudiante:", error);
    }
  };

  return (
    <Dialog open aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1vw' }}>
          {isEditing ? <Typography variant="h5">Editar Estudiante</Typography> : <Typography variant="h5">Añadir Estudiante</Typography>}
          <TextField
            error={formData.id_institucional === ""}
            helperText={formData.id_institucional === "" ? "Campo requerido" : ""}
            className="form-control"
            name="id_institucional"
            label="ID Institucional"
            value={formData.id_institucional}
            onChange={handleChange}
          />
          <TextField
            error={formData.nombre === ""}
            helperText={formData.nombre === "" ? "Campo requerido" : ""}
            name="nombre"
            label="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <TextField
            error={formData.apellido === ""}
            helperText={formData.apellido === "" ? "Campo requerido" : ""}
            name="apellido"
            label="Apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
          <TextField
            error={formData.cedula === ""}
            helperText={formData.cedula === "" ? "Campo requerido" : ""}
            name="cedula"
            label="Cedula"
            value={formData.cedula}
            onChange={handleChange}
          />
          <TextField
            error={formData.correo_intitucional === ""}
            helperText={formData.correo_intitucional === "" ? "Campo requerido" : ""}
            name="correo_intitucional"
            label="Correo Institucional"
            value={formData.correo_intitucional}
            onChange={handleChange}
          />
          <TextField
            error={formData.fecha_nacimiento === ""}
            helperText={formData.fecha_nacimiento === "" ? "Campo requerido" : ""}
            name="fecha_nacimiento"
            label="Fecha de Nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
          />
          <TextField
            error={formData.genero === ""}
            helperText={formData.genero === "" ? "Campo requerido" : ""}
            name="genero"
            label="Genero"
            value={formData.genero}
            onChange={handleChange}
          />
          <TextField
            error={formData.direccion === ""}
            helperText={formData.direccion === "" ? "Campo requerido" : ""}
            name="direccion"
            label="Direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2vw' }}>
          <Button color="secondary" onClick={handleSubmit}>
            {isEditing ? "Editar" : "Agregar"}
          </Button>
          <Button color="primary" onClick={onCancel} autoFocus>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormEditarEstudiante;