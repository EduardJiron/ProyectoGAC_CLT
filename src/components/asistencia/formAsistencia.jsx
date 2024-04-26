import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { configToken } from '../utilities/funciones';
import { Button, TextField, Typography, Select, MenuItem } from '@mui/material';
import CustomSnackbar  from '../utilities/CustomSnackbar'

const FormularioAsistencia = ({ id_clase, onCancel,onSnackbar,onOpen }) => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [datosAsistencia, setDatosAsistencia] = useState([]);
    const [enviandoAsistencia, setEnviandoAsistencia] = useState(false);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.16:3001/api/v1/estudiante/getEstudianteByclase/${id_clase}`, configToken());
                if (Array.isArray(response.data.body)) {
                    setEstudiantes(response.data.body);
                    const initialAsistencia = response.data.body.map(estudiante => ({
                        id_estudiante: estudiante.id_estudiante,
                        asistencia: 0,
                        comentario: '',
                        id_clase: id_clase,
                    }));
                    setDatosAsistencia(initialAsistencia);
                } else {
                    setEstudiantes([]);
                }
            } catch (error) {
                console.error('Error al obtener estudiantes:', error);
            }
        };

        fetchData();
    }, [id_clase]);

    const handleAsistenciaChange = (index, valor) => {
        const newDatosAsistencia = [...datosAsistencia];
        newDatosAsistencia[index].asistencia = valor;
        setDatosAsistencia(newDatosAsistencia);
    };

    const handleComentarioChange = (index, valor) => {
        const newDatosAsistencia = [...datosAsistencia];
        newDatosAsistencia[index].comentario = valor;
        setDatosAsistencia(newDatosAsistencia);
    };

    const enviarAsistenciaEstudiante = async (index) => {
        try {
            const response = await axios.post('http://192.168.1.16:3001/api/v1/asistencia/addAsistencia', datosAsistencia[index], configToken());
            if (response.status === 200) {
                onSnackbar('Asistencia enviada correctamente', 'success');
                
            }
            onCancel();
        } catch (error) {
            console.error('Error al enviar la asistencia:', error);
        }
    };

    const enviarAsistencia = async () => {
        setEnviandoAsistencia(true);
        datosAsistencia.forEach((_, index) => {
            enviarAsistenciaEstudiante(index);
        });
        setEnviandoAsistencia(false);
    };

    return (
        <div
        
        >
            <h2>Registro de Asistencia</h2>
            <table style={{ width: '100%', textAlign: 'center' ,marginTop:'2vw'}}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Asistencia</th>
                        <th>Comentario</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map((estudiante, index) => (
                        <tr key={estudiante.id_estudiante}>
                            <td>{estudiante.nombre}</td>
                            <td>{estudiante.apellido}</td>
                            <td>
                                <Select
                                    size='small'
                                    value={datosAsistencia[index].asistencia}
                                    onChange={(e) => handleAsistenciaChange(index, e.target.value)}
                                >
                                    <MenuItem value={0}>Ausente</MenuItem>
                                    <MenuItem value={1}>Presente</MenuItem>
                                </Select>
                            </td>
                            <td>
                                <TextField
                                    variant="outlined"
                                    size='small'
                                    value={datosAsistencia[index].comentario}
                                    onChange={(e) => handleComentarioChange(index, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button onClick={enviarAsistencia} disabled={enviandoAsistencia}>Enviar</Button>
            <Button onClick={onCancel}>Cancelar</Button>


          
        </div>
    );
};

export default FormularioAsistencia;
