import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { configToken } from '../utilities/funciones';
import CustomSnackbar from "../utilities/CustomSnackbar";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
  FormControlLabel,
} from '@mui/material';


export const InscripcionEstudiantes = () => {
  const [clases, setClases] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedClase, setSelectedClase] = useState('');
  const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);
  const [periodo_academico, setPeriodo_academico] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");


  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get('http://192.168.1.16:3001/api/v1/clase/getallclaseE', configToken());
        const responsePeriodo = await axios.get("http://192.168.1.16:3001/api/v1/periodo_academico/allperiodo_academico", configToken());
        
        setPeriodo_academico(responsePeriodo.data.body);
        setClases(response.data.body);
      } catch (error) {
        console.error('Error al obtener las clases:', error);
      }
    };

    fetchClases();
  }, []);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      if (selectedClase) {
        try {
          const response = await axios.get('http://192.168.1.16:3001/api/v1/estudiante/getallestudiante', configToken());
          const estudiantesNoInscritos = response.data.body.filter(estudiante => !estudiante.inscrito);
          setEstudiantes(estudiantesNoInscritos);
        } catch (error) {
          console.error('Error al obtener los estudiantes:', error);
        }
      }
    };

    fetchEstudiantes();
  }, [selectedClase]);

  const handleClaseChange = (event) => {
    setSelectedClase(event.target.value);
  };

  const handlePeriodoChange = (event) => {
    setSelectedPeriodo(event.target.value);
  };

  const handleEstudianteCheckboxChange = (event) => {
    const estudianteId = event.target.value;
    if (event.target.checked) {
      setSelectedEstudiantes([...selectedEstudiantes, estudianteId]);
    } else {
      setSelectedEstudiantes(selectedEstudiantes.filter(id => id !== estudianteId));
    }
  };

  const handleInscribirClick = async () => {
    if (selectedClase === "" || selectedPeriodo === "" || selectedEstudiantes.length === 0) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Por favor, seleccione una clase, un periodo y al menos un estudiante.");
        setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.get(`http://192.168.1.16:3001/api/v1/estudiante/isInscrito?id_estudiante=${selectedEstudiantes[0]}&id_clase=${selectedClase}`, configToken());

      if (response.data.inscrito) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Uno o más estudiantes ya están inscritos en la clase seleccionada.");
        setSnackbarOpen(true);
        return;
      }

      const data = selectedEstudiantes.map(id => ({
        id_clase: selectedClase,
        id_periodo: selectedPeriodo,
        id_estudiante: id,
        estado: 3
      }));

      await Promise.all(data.map(studentData =>
        axios.post('http://192.168.1.16:3001/api/v1/estudiante/addestudianteinscripcion', studentData, configToken())
      ));

      console.log('Inscripción exitosa');
    } catch (error) {
      console.error('Error al inscribir estudiantes:', error);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="claseSelect-label">Selecciona una clase:</InputLabel>
        <Select
          labelId="claseSelect-label"
          id="claseSelect"
          value={selectedClase}
          onChange={handleClaseChange}
        >
          <MenuItem value="">
            <em>Seleccione una clase</em>
          </MenuItem>
          {clases.map(clase => (
            <MenuItem key={clase.id_clase} value={clase.id_clase}>
              {clase.nombre_clase}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="periodoSelect-label">Selecciona un periodo:</InputLabel>
        <Select
          labelId="periodoSelect-label"
          id="periodoSelect"
          value={selectedPeriodo}
          onChange={handlePeriodoChange}
        >
          <MenuItem value="">
            <em>Seleccione un periodo</em>
          </MenuItem>
          {periodo_academico.map(periodo => (
            <MenuItem key={periodo.id_periodo} value={periodo.id_periodo}>
              {periodo.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        <p>Estudiantes:</p>
        {estudiantes.map(estudiante => (
          <div key={estudiante.id_estudiante}>
            <FormControlLabel
              control={
                <Checkbox
                  id={`estudiante_${estudiante.id}`}
                  value={estudiante.id_estudiante}
                  onChange={handleEstudianteCheckboxChange}
                />
              }
              label={estudiante.nombre}
            />
          </div>
        ))}
      </div>

      <Button variant="contained" onClick={handleInscribirClick}>Inscribir</Button>


      <CustomSnackbar
  open={snackbarOpen}
  onClose={() => setSnackbarOpen(false)}
  severity={snackbarSeverity}
  message={snackbarMessage}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
/>
    </div>

    
  );

};
