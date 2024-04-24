import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { configToken } from '../utilities/funciones';

const FormularioAsistencia = ({ id_clase, onCancel }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [datosAsistencia, setDatosAsistencia] = useState([]);
  const [enviandoAsistencia, setEnviandoAsistencia] = useState(false); // Estado para rastrear si se está enviando la asistencia

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.16:3001/api/v1/estudiante/getEstudianteByclase/${id_clase}`, configToken());
        setEstudiantes(response.data.body);
        
        const initialAsistencia = response.data.body.map(estudiante => ({
          id_estudiante: estudiante.id_estudiante,
          asistencia: 0, 
          justificacion: 0, 
          comentario: '',
          id_clase: id_clase,
          id_profesor: 1
        }));
        setDatosAsistencia(initialAsistencia);
      } catch (error) {
        console.error('Error al obtener estudiantes:', error);
      }
    };

    fetchData();
  }, [id_clase]);

  // Función para manejar cambios en la asistencia
  const handleAsistenciaChange = (index, campo, valor) => {
    const newDatosAsistencia = [...datosAsistencia];
    newDatosAsistencia[index][campo] = valor ? 1 : 0; 
    setDatosAsistencia(newDatosAsistencia);
  };

  // Función para manejar cambios en la justificación
  const handleJustificacionChange = (index, valor) => {
    const newDatosAsistencia = [...datosAsistencia];
    newDatosAsistencia[index].justificacion = valor ? 1 : 0; 
    setDatosAsistencia(newDatosAsistencia);
  };

  // Función para manejar cambios en el comentario
  const handleComentarioChange = (index, valor) => {
    const newDatosAsistencia = [...datosAsistencia];
    newDatosAsistencia[index].comentario = valor;
    setDatosAsistencia(newDatosAsistencia);
  };

  // Función para enviar los datos de asistencia de un estudiante al servidor
 const enviarAsistenciaEstudiante = async (index) => {
    try {
      const response = await axios.post('http://192.168.1.16:3001/api/v1/asistencia/addAsistencia', datosAsistencia[index], configToken());
      onCancel(); 
    } catch (error) {
      console.error('Error al enviar la asistencia:', error);
    }
 }

 // Función para enviar los datos de asistencia de todos los estudiantes al servidor
 const enviarAsistencia = async () => {
    setEnviandoAsistencia(true); // Activar el estado de enviando asistencia
    datosAsistencia.forEach((_, index) => {
      enviarAsistenciaEstudiante(index);
    });
    setEnviandoAsistencia(false); // Desactivar el estado de enviando asistencia una vez finalizado el envío
 }

  return (
    <div>
      <h2>Registro de Asistencia</h2>
     
        {estudiantes.map((estudiante, index) => (
          <div key={estudiante.id_estudiante}>
            <h3>{estudiante.nombre}</h3>
            <label>
              <input
                type="checkbox"
                checked={datosAsistencia[index].asistencia === 1} // Marcar si la asistencia es 1
                onChange={e => handleAsistenciaChange(index, 'asistencia', e.target.checked)} // Cambiar a 1 si está marcado, 0 si no
              />
              Asistencia
            </label>
            <label>
              Justificación:
              <input
                type="checkbox"
                checked={datosAsistencia[index].justificacion === 1} 
                onChange={e => handleJustificacionChange(index, e.target.checked)} 
              />
            </label>
            <label>
              Comentario:
              <input
                type="text"
                value={datosAsistencia[index].comentario}
                onChange={e => handleComentarioChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={enviarAsistencia} disabled={enviandoAsistencia}>Guardar Asistencia</button>
        <button onClick={onCancel} disabled={enviandoAsistencia}>Cancelar</button> {/* Desactivar el botón Cancelar mientras se envía la asistencia */}
      
    </div>
  );
};

export default FormularioAsistencia;
