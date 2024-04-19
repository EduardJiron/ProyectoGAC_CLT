import { Sidebar } from "../components/sidebar";
import { GestionarFacultad } from '../components/facultad/gestionarFacultad';
import { useState, useEffect } from "react";

export const Facultad = ({ name }) => {
  const [uri, setUri] = useState('http://192.168.1.16:3001/api/v1/facultad/allfacultad');

  return (
    <>
      <div className="gestion-container">
        <Sidebar />
        <div className="gestion">
          <div className="gestion-header">
            <h2>{name}</h2>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {uri && <GestionarFacultad uri={uri} />}
          </div>
        </div>
      </div>
    </>
  );
};
