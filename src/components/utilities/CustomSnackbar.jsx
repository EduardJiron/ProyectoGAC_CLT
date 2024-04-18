import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const CustomSnackbar = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={2000} 
      onClose={onClose} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Corregido a 'bottom'
    >
      <MuiAlert 
        onClose={onClose} 
        severity={severity} 
        sx={{ 
          width: '100%', 
          bgcolor: 'black', 
          color: 'white', 
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

    


export default CustomSnackbar;
