import { Dialog } from "@mui/material";
import {handleEliminardeleteCalificacion} from "../service/calificacionesEndpoint";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const FormEliminarCalificacion= ({ open, Calificacion,onCancel,onRecargarDatos,onSnackbar}) => {

    const onEliminar = async () => {
            try {
                const success = await handleEliminardeleteCalificacion(Calificacion.id_calificacion);
                if (success) {
                    onRecargarDatos();
                    onSnackbar('success','Carrera eliminada exitosamente');
                    onCancel();
                } else {
                    console.error("Error al eliminar calificacion");
                }
            } catch (error) {
                console.error("Error al eliminar calificacion:", error);
            }

    }

    return (
        <Dialog 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

        open={open} onClose={onCancel}>
        <div >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar la calificacion "+Calificacion.id_calificacion +"?"}
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

    export default  FormEliminarCalificacion;