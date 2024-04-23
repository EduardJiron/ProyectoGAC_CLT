import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Obtener el token del 

  const handleLogin = async() => {
    try {
      const response = await axios.post('http://192.168.1.16:3001/api/v1/login', {
        username,
        password,
      });
      setToken(response.data.token);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    
    if (token) {
      sessionStorage.setItem('token', token);
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
