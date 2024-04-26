import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import logo12H from "../assets/img/logo12h.png";
import ConfigIcon from "../assets/img/configIcon.png";
import "../assets/css/sidebar.css";

export const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  
    window.location.href = '/login';
  };

  return (
    <>
      <div className="sidebar">
        <div className="GACinfo">
          <img src={logo12H} alt="logo" />
          <h1>GAC</h1>
        </div>
        <div className="MenuSideBar">
          <ul>
            <a>
              <li>Hogar</li>
            </a>
            <a href="/asistencia">
              <li>Asistencia</li>
            </a>
            <a href="/calificaciones">
              <li>Calificaciones</li>
            </a>
            <a
              href="/historial"
            >
              <li>Historial</li>
            </a>
          </ul>
        </div>
        <div className="handleUser">
          <section className="userInfo">
            <p className="Username">{localStorage.getItem('usuario')}</p>
            <Button 
            sx={{ width: '100%'}}
              onClick={handleMenuOpen}
              size="small"
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              opciones
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </section>
          <section className="config">
            <a href="/gestion">
              <img src={ConfigIcon} alt="config icon" className="cicon" />
            </a>
          </section>
        </div>
      </div>
    </>
  );
};


