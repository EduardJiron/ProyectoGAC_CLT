import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './components/app.css';
import { Login } from './routes/login';
import{Asistencia} from './routes/asistencia'
import {Clase} from './routes/clase'
import {Gestion} from './routes/gestionar'
const token = sessionStorage.getItem('token');

const app = createRoot(document.getElementById('root'));

app.render(
  <BrowserRouter>
    <Routes>
      {token ? (
        <>
          <Route path="/clase" element={<Clase name="Clase" />} />
          <Route path="/asistencia" element={<Asistencia name="Asistencia" />} />
          <Route path="/gestion" element={<Gestion name="Gestión" />} />
          
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
