import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { handleEditarUsuario, handleInsertarUsuario } from "../service/usuarioEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";

const FormEditarUsuario = ({ Usuario, onCancel, isEditing, onRecargarDatos, onSnackbar }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  

  useEffect(() => {
    if (isEditing) {
      setFormData({
        username: Usuario.username || "",
        password: Usuario.password || ""

      });
    } else {
      setFormData({
        username: "",
        password: ""
      });
    }
  }, [Usuario, isEditing]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      switch (true) {
        case formData.username === "":
          onSnackbar("error", "username es requerido");
          return;
        case formData.password === "":
          onSnackbar("error", "Contraseña es requerida");
          return;
        default:
          break;
      }
      if (isEditing) {
        const success = await handleEditarUsuario(formData, Usuario.id_usuario);
        if (success) {
          onRecargarDatos();
          onSnackbar('success', 'Usuario editada exitosamente');
          onCancel();
        } else {
          console.error("Error al editar Usuario");
        }
      } else {
        const success = await handleInsertarUsuario(formData);
        if (success) {
          onRecargarDatos();
          onSnackbar('success', 'Usuario añadida exitosamente');
          onCancel();
        } else {
          console.error("Error al añadir Usuario");
        }
      }
    } catch (error) {
      console.error("Error al editar/agregar Usuario:", error);
    }
  };

  return (
    <Dialog open aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1vw' }}>
          {isEditing ? <Typography variant="h5">Editar Usuario</Typography> : <Typography variant="h5">Añadir Usuario</Typography>}
          <TextField
            error={formData.username === ""}
            helperText={formData.username === "" ? "Campo requerido" : ""}
            className="form-control"
            name="username"
            label="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            error={formData.password === ""}
            helperText={formData.password === "" ? "Campo requerido" : ""}
            name="password"
            label="Password"
            value={formData.password}
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

export default FormEditarUsuario;
