import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { handleEditarProfesor, handleInsertarProfesor } from "../service/profesorEndPoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
const FormEditarProfesor = ({ Profesor, usuario, onCancel, isEditing, onRecargarDatos, onSnackbar }) => {
    const [formData, setFormData] = useState({
        especialidad: "",
        id_institucional: "",
        nombre: "",
        apellido: "",
        cedula: "",
        correo_intitucional: "",
        fecha_nacimiento: "",
        genero: "",
        direccion: "",
        id_usuario: ""

    });


    useEffect(() => {
        console.log(usuario)
        if (isEditing) {
            setFormData({
                especialidad: Profesor.especialidad || "",
                id_institucional: Profesor.id_institucional || "",
                nombre: Profesor.nombre || "",
                apellido: Profesor.apellido || "",
                cedula: Profesor.cedula || "",
                correo_intitucional: Profesor.correo_intitucional || "",
                fecha_nacimiento: Profesor.fecha_nacimiento || "",
                genero: Profesor.genero || "",
                direccion: Profesor.direccion || "",
                id_usuario: usuario.length > 0 ? usuario[0].id_usuario : ""



            });
        } else {
            setFormData({
                especialidad: "",
                id_institucional: "",
                nombre: "",
                apellido: "",
                cedula: "",
                correo_intitucional: "",
                fecha_nacimiento: "",
                genero: "",
                direccion: "",
                id_usuario: ""
            });
        }
    }, [Profesor, isEditing, usuario]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUsuarioChange = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, id_usuario: value });
      };

    const handleSubmit = async () => {
        try {
            switch (true) {
                case formData.especialidad === "":
                    onSnackbar("error", "Especialidad es requerida");
                    return;
                case formData.id_institucional === "":
                    onSnackbar("error", "ID_institucional es requerido");
                    return;
                case formData.nombre === "":
                    onSnackbar("error", "Nombre es requerido");
                    return;
                case formData.apellido === "":
                    onSnackbar("error", "Apellido es requerida");
                    return;
                case formData.cedula === "":
                    onSnackbar("error", "Cedula es requerida");
                    return;
                case formData.correo_intitucional === "":
                    onSnackbar("error", "Correo Instituacional es requerido");
                    return;
                case formData.fecha_nacimiento === "":
                    onSnackbar("error", "Fecha de nacimiento es requerido");
                    return;
                case formData.genero === "":
                    onSnackbar("error", "Sexo es requerido");
                    return;
                case formData.direccion === "":
                    onSnackbar("error", "Direccion requerida");
                    return;
                case formData.id_usuario === "":
                    onSnackbar("error", "Usuario es requerido");
                    return;

                default:
                    break;
            }
            if (isEditing) {
                const success = await handleEditarProfesor(formData, Profesor.id_profesor);
                if (success) {
                    onRecargarDatos();
                    onSnackbar('success', 'Profesor editado exitosamente');
                    onCancel();
                } else {
                    console.error("Error al editar Profesor");
                }
            } else {
                const success = await handleInsertarProfesor(formData);
                if (success) {
                    onRecargarDatos();
                    onSnackbar('success', 'Profesor añadido exitosamente');
                    onCancel();
                } else {
                    console.log(formData)
                    console.error("Error al añadir Profesor");
                }
            }
        } catch (error) {
            console.error("Error al editar/agregar Profesor:", error);
        }
    };

    return (
        <Dialog open aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogContent>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1vw' }}>
                    {isEditing ? <Typography variant="h5">Editar Profesor</Typography> : <Typography variant="h5">Añadir Profesor</Typography>}

                    <TextField
                        error={formData.especialidad === ""}
                        helperText={formData.especialidad === "" ? "Campo requerido" : ""}
                        className="form-control"
                        name="especialidad"
                        label="Especialidad"
                        value={formData.especialidad}
                        onChange={handleChange}
                    />
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
                        className="form-control"
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
                        className="form-control"
                        name="correo_intitucional"
                        label="Correo Institucional"
                        value={formData.correo_intitucional}
                        onChange={handleChange}
                    />
                    <TextField
                        error={formData.fecha_nacimiento === ""}
                        helperText={formData.fecha_nacimiento === "" ? "Campo requerido" : ""}
                        className="form-control"
                        name="fecha_nacimiento"
                        label="Fecha de Nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                    />
                    <TextField
                        error={formData.genero === ""}
                        helperText={formData.genero === "" ? "Campo requerido" : ""}
                        className="form-control"
                        name="genero"
                        label="Genero"
                        value={formData.genero}
                        onChange={handleChange}
                    />
                    <TextField
                        error={formData.direccion === ""}
                        helperText={formData.direccion === "" ? "Campo requerido" : ""}
                        className="form-control"
                        name="direccion"
                        label="Direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                    <TextField
                        error={formData.id_usuario === ""}
                        sx={{ width: 220 }}
                        select
                        name="id_usuario"
                        label="ID usuario"
                        value={formData.id_usuario}
                        onChange={handleUsuarioChange}
                    >
               
                        {usuario.map((usuarios) => (
                            <MenuItem key={usuarios.id_usuario} value={usuarios.id_usuario}>
                                {usuarios.username}
                            </MenuItem>
                        ))}
                    </TextField>

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

export default FormEditarProfesor;
