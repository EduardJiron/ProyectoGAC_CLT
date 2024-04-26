import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './components/app.css';
import { Login } from './routes/login';
import{Asistencia} from './routes/asistencia'
import {Calificaciones} from './routes/calificaciones'
import {Gestion} from './routes/gestionar'

const token = sessionStorage.getItem('token');

const app = createRoot(document.getElementById('root'));

app.render(
  <BrowserRouter>
    <Routes>
      {token ? (
        <>
         
          <Route path="/asistencia" element={<Asistencia name="Asistencia" />} />
          <Route path="/gestion" element={<Gestion name="Gestión" />} />
          <Route path="/calificaciones" element={<Calificaciones name="Calificaciones" />} />
   
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
