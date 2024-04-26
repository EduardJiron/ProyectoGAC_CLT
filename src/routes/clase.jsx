import { Sidebar } from "../components/sidebar";
import { Gestionar } from '../components/carrera/gestionarCarrera';
import { useState, useEffect } from "react";
import {GestionarClase} from '../components/clase/gestionarClase'
export const Clase = ({ name }) => {
  const [uri, setUri] = useState('http://localhost:3001/api/v1/clase/getallclase/'+localStorage.getItem('profesor'));

  return (
    <>
      <div className="gestion-container">
        <Sidebar />
        <div className="gestion">
          <div className="gestion-header">
            <h2>{name}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {uri && <GestionarClase uri={uri} />}
          </div>
        </div>
      </div>
    </>
  );
};
