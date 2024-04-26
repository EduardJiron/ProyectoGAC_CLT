import { Dialog } from "@mui/material";
import {handleEliminarProfesor} from "../service/profesorEndPoint";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const FormEliminarProfesor= ({ open,Profesor, onCancel,onRecargarDatos,onSnackbar}) => {

    const onEliminar = async () => {
            try {
                const success = await handleEliminarProfesor(Profesor.id_profesor);
                if (success) {
                    onRecargarDatos();
                    onSnackbar('success','Profesor eliminado exitosamente');
                    onCancel();
                } else {
                    console.error("Error al eliminar Profesor");
                }
            } catch (error) {
                console.error("Error al eliminar Profesor:", error);
            }

    }

    return (
        <Dialog 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

        open={open} onClose={onCancel}>
        <div >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar al profesor "+Profesor.nombre +"?"}
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

    export default FormEliminarProfesor;