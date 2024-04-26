import { Sidebar } from "../components/sidebar";
import { GestionarAsistencia} from '../components/asistencia/gestionarAsistencia';
import { useState, useEffect } from "react";
import { GestionarCalificaciones } from "../components/calificaciones/gestionarCalificaciones";
export const Calificaciones = ({ name,token }) => {

    
    const [uri, setUri] = useState('http://192.168.1.16:3001/api/v1/clase/getallclase/'+localStorage.getItem('profesor'));


  return (
    <>
      <div className="gestion-container">
        <Sidebar />
        <div className="gestion">
          <div className="gestion-header">
            <h2>{name}</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
           {uri && <GestionarCalificaciones uri={uri} token={token} />}
          </div>
        </div>
      </div>
    </>
  );
};
