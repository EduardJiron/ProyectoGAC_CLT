import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ContextMenu = ({ anchorPosition, onClose, onEditarClick, onEliminarClick }) => {
  return (
    <Menu
      open={anchorPosition.mouseY !== null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        anchorPosition.mouseY !== null && anchorPosition.mouseX !== null
          ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX }
          : undefined
      }
    >
      <MenuItem 
        
      onClick={onEditarClick}>Editar</MenuItem>
      <MenuItem onClick={onEliminarClick}>Eliminar</MenuItem>
    </Menu>
  );
};

export default ContextMenu;
