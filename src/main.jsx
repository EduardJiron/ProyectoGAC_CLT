import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './components/app.css';
import { Carrera } from './routes/carrera';
import { PeriodoAcademico } from './routes/periodoAcademico';
import { Facultad } from './routes/facultad';
import { Login } from './routes/login';

const token = sessionStorage.getItem('token');
const config = {
  headers:
    { Authorization: `Bearer ${token}` }
};

const app = createRoot(document.getElementById('root'));

app.render(
  <BrowserRouter>
    <Routes>
      {token ? (
        <>
          <Route path="/facultad" element={<Facultad name="Facultad" />} />
          <Route path="/carrera" element={<Carrera name="Carrera" token={config} />} />
          <Route path="/periodo_academico" element={<PeriodoAcademico name="Periodo Académico" />} />
          
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
