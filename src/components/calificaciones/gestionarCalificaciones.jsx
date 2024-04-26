import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { configToken } from '../utilities/funciones';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import CustomSnackbar from '../utilities/CustomSnackbar';
import { GestionarCal } from './gestionarCal';
export const GestionarCalificaciones = ({ uri }) => {
    const [data, setData] = useState([]);
    const [id_clase, setIdClase] = useState(null);
    const [isformVisible, setIsFormVisible] = useState(false);
    const [isListVisible, setIsListVisible] = useState(true);
   
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    

    const handleFormCalificacion = (id_clase) => {
        setIdClase(id_clase);
        setIsFormVisible(true);
        setIsListVisible(false);
    }

    const handleCancelar = () => {
        setIsFormVisible(false);
        setIsListVisible(true);
    }
    
    const handleSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }
    useEffect(() => {
        const fetchData = async () => {
            if (uri) {
                try {
                    const response = await axios.post(uri, null, configToken());
                    setData(response.data.body);
                } catch (err) {
                    console.log(err);
                }
            } else {
                console.error('uri no definida');
            }
        };

        fetchData();
    }, [uri]);

    return (
        <div 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            { isListVisible && (
                 Array.isArray(data) && data.length > 0 ? (
                    <div className='classlist'>
                        {data.map((item) => (
                            <Accordion
                                sx={{
                                    width: '50vw',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginBottom: '1vw',
                                    backgroundColor: '#f5f5f5'
                                }}
                                key={item.id_clase}>
                                <AccordionSummary>
                                    <div
                                        style={{ textTransform: 'uppercase', padding: '10px', width: '100%' }}
                                        className='classlist__item'>
                                        <div className='classlist__item__title'>
                                            <h3>{item.nombre}</h3>
                                        </div>
                                        <div
                                            style={{ justifyContent: 'space-between' }}
                                            className='classlist__item__content'>
                                            <span>{item.fecha}</span>
                                            <span>Horario: {item.horario} - {item.dia}</span>
                                            <p> Cod: {item.cod_clase}</p>
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <button onClick={() => handleFormCalificacion(item.id_clase)}>Calificar</button>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                ) : (
                    <p>No hay datos disponibles</p>
                )
            )
            
        }

        { isformVisible && (
            <GestionarCal id_clase={id_clase} onCancel={handleCancelar} onSnackbar={handleSnackbar} />
        )}
          
        </div>
    );
};
