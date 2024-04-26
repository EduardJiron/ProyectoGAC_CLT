import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'; // Importa el archivo CSS para estilos personalizados
import { TextField,Button } from '@mui/material';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [idProfesor, setIdProfesor] = useState('' || null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.16:3001/api/v1/login', {
        username,
        password,
      });
      setToken(response.data.token);
      const idProfesor = response.data.profesor.id_profesor;

      localStorage.setItem('profesor', idProfesor);
      console.log(idProfesor);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token);
      localStorage.setItem('usuario', username);
    }
  }, [token]);

  if (token) {
    return (window.location.href = '/Asistencia');
  }

  return (
    <div className="login-container"> 
      <div
      className='input-container' 
      >

        <h1
        className='Login-title'
        >GAC</h1>
        <div
        style={{
          height: '20px',
        
        }}
        />  
        
        <TextField
         sx={{ width: '60%' }}
          label="Usuario"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div
        style={{
          height: '20px',
        
        }}
        />  
        <TextField
        sx={{ width: '60%' }}
          label="Contraseña"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
           <div
        style={{
          height: '20px',
        
        }}
        />  
        <Button 
         sx={{ width: '60%' }}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Iniciar Sesión
        </Button>
      
      </div>
    </div>
  );
};
