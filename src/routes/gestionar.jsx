import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Sidebar } from "../components/sidebar";
import { Gestionar } from '../components/carrera/gestionarCarrera';
import { GestionarFacultad } from '../components/facultad/gestionarFacultad';
import { GestionarPeriodoAcademico } from '../components/periodoAcademico/gestionarPeriodoAcademico';
import { GestionarClase } from '../components/clase/gestionarClase';
import {InscripcionEstudiantes} from '../components/Inscripcion/gestionarInscripcion';
import {GestionaClaseEstudiante} from '../components/EstudianteClase/gestionarEstudianteClase'
import {GestionaProfesorClase} from '../components/ProfesorClase/gestionarProfesorClase'
import { GestionarEstudiante } from '../components/estudiante/gestionarEstudiante';
const AccordionSection = ({ title, children }) => (
  <Accordion className="accordion">
    <AccordionSummary>
      <h2>{title}</h2>
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
);

const Uri ={
   getCarreras: 'http://192.168.1.16:3001/api/v1/carrera/getAllCarrera',
    getFacultades: 'http://192.168.1.16:3001/api/v1/facultad/allfacultad',
    getPeriodoacademico:'http://192.168.1.16:3001/api/v1/periodo_academico/allperiodo_academico',
    getClase:'http://192.168.1.16:3001/api/v1/clase/getallclaseE',
    getInscripcion:'http://192.168.1.16:3001/api/v1/estudiante/getestudiante',
    getProfesorClase:"http://192.168.1.16:3001/api/v1/profesor/getprofesorclase",
    getEstudiante:'http://192.168.1.16:3001/api/v1/estudiante/getAllEstudiante'

}

export const Gestion = () => {
  return (
    <>
        <div
        className='gestion-container' 
        >
            <div className="gestion-header">
        <h2>Gestionar</h2>
          </div>
      <div className="gestion-container">
        <Sidebar />
        <div className="gestion">
          <div className="gestion-header"></div>
          <div className="accordion-container">
            <AccordionSection title="Gestionar Carrera">
              <Gestionar uri={Uri.getCarreras} />
            </AccordionSection>
            <div style={{ marginBottom: '10px' }} />
            <AccordionSection title="Gestionar Facultad">
              <GestionarFacultad uri={Uri.getFacultades} />
            </AccordionSection>
            <div style={{ marginBottom: '10px' }} />
            <AccordionSection title="Gestionar Periodo Académico">
              <GestionarPeriodoAcademico uri={Uri.getPeriodoacademico}/>
            </AccordionSection>
            <div style={{ marginBottom: '10px' }} />
            <AccordionSection title="Gestionar Clase">
              <GestionarClase uri={Uri.getClase}/>
            </AccordionSection>
            <div style={{ marginBottom: '10px' }} />
            <AccordionSection title="Inscripción clase(B)">
              <InscripcionEstudiantes />
            </AccordionSection>
            <div style={{ marginBottom: '10px' }} />
            <AccordionSection title="Inscribir clase">
              <GestionaClaseEstudiante uri={Uri.getInscripcion} />
            </AccordionSection>
            <div style={{ marginBottom: '10px' }} />
            <AccordionSection title="Inscribir Profesor">
              <GestionaProfesorClase uri={Uri.getProfesorClase} />
            </AccordionSection>
            <div style={{ marginBottom: '10px' }} />
            <AccordionSection title="Gestionar Estudiante">
              <GestionarEstudiante uri={Uri.getEstudiante}/>
            </AccordionSection>
          </div>
        </div>
      </div>
        </div>
    </>
  );
};
