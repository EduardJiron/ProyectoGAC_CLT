import { Dialog } from "@mui/material";
import {handleEliminarEstudiante} from "../service/estudianteEndpoint";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const FormEliminarEstudiante= ({ open,Estudiante, onCancel,onRecargarDatos,onSnackbar}) => {

    const onEliminar = async () => {
            try {
                const success = await handleEliminarEstudiante(Estudiante.id_estudiante);
                if (success) {
                    onRecargarDatos();
                    onSnackbar('success','Estudiante eliminada exitosamente');
                    onCancel();
                } else {
                    console.error("Error al Estudiante carrera");
                }
            } catch (error) {
                console.error("Error al eliminar Estudiante:", error);
            }

    }

    return (
        <Dialog 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

        open={open} onClose={onCancel}>
        <div >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar el/la Estudiante "+Estudiante.nombre +"?"}
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

    export default FormEliminarEstudiante;