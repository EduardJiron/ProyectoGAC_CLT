import { Dialog } from "@mui/material";
import {handleEliminarinscripcion} from "../service/inscripcionEndpoint";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const FormEliminarEstudianteClase = ({ open,EstudianteClase, onCancel,onRecargarDatos,onSnackbar}) => {

    const onEliminar = async () => {
    try {
        await handleEliminarinscripcion(EstudianteClase.id_inscripcion);
        onRecargarDatos();
        onSnackbar("success", "Inscripción eliminada correctamente");
        onCancel();
    } catch (error) {
        onSnackbar("error", "Error al eliminar inscripción");
        console.error(error);
    }
}

    return (
        <Dialog 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

        open={open} onClose={onCancel}>
        <div >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar la inscripcion "+EstudianteClase.Clase +"?"}
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

    export default FormEliminarEstudianteClase;