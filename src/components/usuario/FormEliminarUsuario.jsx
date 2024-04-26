import { Dialog } from "@mui/material";
import {handleEliminarUsuario} from "../service/usuarioEndpoint";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const FormEliminarUsuario= ({ open,Usuario, onCancel,onRecargarDatos,onSnackbar}) => {

    const onEliminar = async () => {
            try {
                const success = await handleEliminarUsuario(Usuario.id_usuario);
                if (success) {
                    onRecargarDatos();
                    onSnackbar('success','Usuario eliminado exitosamente');
                    onCancel();
                } else {
                    console.error("Error al Usuario carrera");
                }
            } catch (error) {
                console.error("Error al eliminar Usuario:", error);
            }

    }

    return (
        <Dialog 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

        open={open} onClose={onCancel}>
        <div >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar la carrera "+Usuario.username +"?"}
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

    export default FormEliminarUsuario;