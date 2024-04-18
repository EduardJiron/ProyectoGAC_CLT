import { Dialog } from "@mui/material";
import {handleEliminarFacultad} from "../service/facultadEndpoint";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const FormEliminarFacultad= ({ open,facultad, onCancel,onRecargarDatos,onSnackbar}) => {

    const onEliminar = async () => {
            try {
                const success = await handleEliminarFacultad(facultad.id_facultad);
                if (success) {
                    onRecargarDatos();
                    onSnackbar('success','Facultad eliminada exitosamente');
                    onCancel();
                } else {
                    console.error("Error al Facultad carrera");
                }
            } catch (error) {
                console.error("Error al eliminar facultad:", error);
            }

    }

    return (
        <Dialog 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

        open={open} onClose={onCancel}>
        <div >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar la carrera "+facultad.nombre +"?"}
        </DialogTitle>
        <DialogActions>
          <Button  onClick={onEliminar}>Eliminar</Button>
          <Button onClick={onCancel} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
        </div>
        </Dialog>
    );
    }

    export default FormEliminarFacultad;