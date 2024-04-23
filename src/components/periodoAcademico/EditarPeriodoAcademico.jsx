import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "/src/assets/css/sidebar.css";
import { handleEditarPeriodoAcademico,handleInsertarPeriodoAcademico} from "../service/periodoAcademicoEndpoint";
import { Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Input from '@mui/joy/Input';


const FormEditarPeriodoAcademico = ({onCancel,PeriodoAcademico,isEditing,onRecargarDatos,onSnackbar}) => {
  
    const [formData, setFormData] = useState({
        nombre: '',
        fecha_inicio: '',
        fecha_final: '',
      });
      useEffect(() => {
        if(isEditing){
          setFormData({
            nombre: PeriodoAcademico.nombre || "",
            fecha_inicio: PeriodoAcademico.fecha_inicio || "",
            fecha_final: PeriodoAcademico.fecha_final || "",
          });
        }
        else{
          setFormData({
            nombre: "",
            fecha_inicio: "",
            fecha_final: "",
          });
        }

      }, [PeriodoAcademico,isEditing])
    
    console.log(PeriodoAcademico);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        };

        const handleChangeFechaInicio = (event) => {
            const { value } = event.target;
            setFormData({ ...formData, fecha_inicio: value });
          };
          
          const handleChangeFechaFinal = (event) => {
            const { value } = event.target;
            setFormData({ ...formData, fecha_final: value });
          };

  const handleSubmit = async () => {
    try {
      switch (true) {
        case formData.nombre === "":
          onSnackbar("error", "Nombre es requerido");
          return;
        case formData.fecha_inicio === "":
          onSnackbar("error", "Fecha de inicio es requerida");
          return;
        case formData.fecha_final === "":
          onSnackbar("error", "Fecha final es requerida");
          return;
        default:
          break;
      }
      if(isEditing){
        const success = await handleEditarPeriodoAcademico(formData,PeriodoAcademico.periodo_academico);
        if(success){
          onRecargarDatos();
          onSnackbar('success', 'Periodo Academico editado exitosamente');
          onCancel();
        }else{
          console.error("Error al editar PeriodoAcademico");
        }
      }
      else{
        const success = await handleInsertarPeriodoAcademico(formData);
        if(success){
          onRecargarDatos();
          onSnackbar('success', 'Periodo Academico añadido exitosamente');
          onCancel();
        }else{
          console.error("Error al añadir PeriodoAcademico");

      }
    }
    } catch (error) {
      console.error("Error al editar PeriodoAcademico:", error);
    }
  };

  return (
    <Dialog open 
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    
     <DialogContent>
     <div style={{ display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center',gap:'1vw' }}>
     <Typography 
     sx={{marginTop:'1vw', fontWeight:'bold'}}
     variant="subtitle1" component="div">
        {isEditing ? "Editar Periodo Academico" : "Añadir Periodo Academico"}
      </Typography>
     <TextField
        size="small"
      
        error={formData.nombre === ""}
        helperText={formData.nombre === "" ? "Campo requerido" : ""}
      className="form-control"
        name="nombre"
        label="Periodo Academico"
        value={formData.nombre}
        onChange={handleChange}
      />
    <label 
    style={{marginTop:'1vw',alignSelf:'start',fontSize:'1.1vw'}}
    >
        Fecha Inicio
    </label>
   <Input
    sx={{width:'100%'}}
        error={formData.fecha_inicio === ""}
        label="Fecha Inicio"
        value={formData.fecha_inicio}
        onChange={handleChangeFechaInicio}
        type="date"
        slotProps={{
          input: {
            min: '2000-12-31',
            max: '2080-12-31',
          },
        }}
      />
      <label 
    style={{marginTop:'1vw',alignSelf:'start',fontSize:'1.1vw'}}
    >
        Fecha final
    </label>
   <Input
    sx={{width:'100%'}}
        label="Fecha final"
        error={formData.fecha_final === ""}
        type="date"
        value={formData.fecha_final}
        onChange={handleChangeFechaFinal}
        slotProps={{
          input: {
            min: '2020-12-31',
            max: '2080-12-31',
          },
        }}
      />
      </div>
      <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'2vw'}}>
      <Button
      
        color="secondary"
      onClick={handleSubmit}>
        {isEditing ? "Editar" : "Añadir"}
      </Button>
      <Button 
      
      color="primary"

      onClick={onCancel} autoFocus>
        Cancelar
      </Button>
      </div>
     </DialogContent>
    
     
    </Dialog>
   
  );
};

export default FormEditarPeriodoAcademico;
