import { Dialog } from "@mui/material";
import {handleEliminarProfesorClase} from "../service/inscripcionEndpoint";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const FormEliminarProfesorClase = ({ open,ProfesorClase, onCancel,onRecargarDatos,onSnackbar}) => {

    const onEliminar = async () => {
        try {
            await handleEliminarProfesorClase(ProfesorClase.id_profesor_clase);
            onRecargarDatos();
            onSnackbar("success", "Profesor eliminado correctamente");
            onCancel();
        } catch (error) {
            onSnackbar("error", "Profesor eliminado correctamente");
            console.error(error);
        }
    };

    return (
        <Dialog 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

        open={open} onClose={onCancel}>
        <div >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar la inscripcion "+ProfesorClase.Profesor +"?"}
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

    export default FormEliminarProfesorClase;