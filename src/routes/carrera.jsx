import { Sidebar } from "../components/sidebar";
import { Gestionar } from '../components/carrera/gestionarCarrera';
import { useState, useEffect } from "react";

export const Carrera = ({ name }) => {
  const [uri, setUri] = useState('http://192.168.1.12:3001/api/v1/carrera/getAllCarrera');

  return (
    <>
      <div className="gestion-container">
        <Sidebar />
        <div className="gestion">
          <div className="gestion-header">
            <h2>{name}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {uri && <Gestionar uri={uri} />}
          </div>
        </div>
      </div>
    </>
  );
};
