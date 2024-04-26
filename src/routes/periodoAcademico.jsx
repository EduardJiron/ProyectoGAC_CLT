import { Sidebar } from "../components/sidebar";
import { GestionarPeriodoAcademico } from '../components/periodoAcademico/gestionarPeriodoAcademico';
import { useState, useEffect } from "react";

export const PeriodoAcademico = ({ name }) => {
  const [uri, setUri] = useState('http://localhost:3001/api/v1/periodo_academico/allperiodo_academico');

  return (
    <>
      <div className="gestion-container">
        <Sidebar />
        <div className="gestion">
          <div className="gestion-header">
            <h2>{name}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {uri && <GestionarPeriodoAcademico uri={uri} />}
          </div>
        </div>
      </div>
    </>
  );
};
