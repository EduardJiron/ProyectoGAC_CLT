import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);  
  const [idProfesor, setIdProfesor] = useState('' || null);
 
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/login', {
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
    return  window.location.href = '/facultad';
  }

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};
