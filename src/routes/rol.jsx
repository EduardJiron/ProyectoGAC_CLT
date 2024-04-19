import { Sidebar } from "../components/sidebar";
import { useState, useEffect } from "react";
import {GestionarRol} from '../components/rol/GestionarRol'
export const Rol = ({ name }) => {
  const [uri, setUri] = useState('http://192.168.1.16:3001/api/v1/periodo_academico/allperiodo_academico');

  return (
    <>
      <div className="gestion-container">
        <Sidebar />
        <div className="gestion">
          <div className="gestion-header">
            <h2>{name}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {uri && <GestionarRol uri={uri} />}
          </div>
        </div>
      </div>
    </>
  );
};
