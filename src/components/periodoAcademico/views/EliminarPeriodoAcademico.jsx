import { Dialog } from "@mui/material";
import {handleEliminarPeriodoAcademico} from "../service/periodoAcademicoEndpoint";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const FormEliminarPeriodoAcademico = ({ open,PeriodoAcademico, onCancel,onRecargarDatos,onSnackbar}) => {

    const onEliminar = async () => {
            try {
                const success = await handleEliminarPeriodoAcademico(PeriodoAcademico.periodo_academico);
                if (success) {
                    onRecargarDatos();
                    onSnackbar('success','PeriodoAcademico eliminada exitosamente');
                    onCancel();
                } else {
                    console.error("Error al eliminar PeriodoAcademico");
                }
            } catch (error) {
                console.error("Error al eliminar PeriodoAcademico:", error);
            }

    }
console.log(PeriodoAcademico);
    return (
        <Dialog 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

        open={open} onClose={onCancel}>
        <div >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar el PeriodoAcademico "+PeriodoAcademico.nombre +"?"}
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

    export default FormEliminarPeriodoAcademico;