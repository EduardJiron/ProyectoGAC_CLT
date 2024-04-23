import { Dialog } from "@mui/material";
import {handleEliminarCarrera} from "../service/carreraEndpoint";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const FormEliminarCarrera = ({ open,carrera, onCancel,onRecargarDatos,onSnackbar}) => {

    const onEliminar = async () => {
            try {
                const success = await handleEliminarCarrera(carrera.id_carrera);
                if (success) {
                    onRecargarDatos();
                    onSnackbar('success','Carrera eliminada exitosamente');
                    onCancel();
                } else {
                    console.error("Error al eliminar carrera");
                }
            } catch (error) {
                console.error("Error al eliminar carrera:", error);
            }

    }
console.log(carrera);
    return (
        <Dialog 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

        open={open} onClose={onCancel}>
        <div >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar la carrera "+carrera.Carrera +"?"}
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

    export default FormEliminarCarrera;