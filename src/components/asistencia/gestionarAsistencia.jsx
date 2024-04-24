import React, { useState } from 'react';
import axios from 'axios';
import { configToken } from '../utilities/funciones';
import FormularioAsistencia from './formAsistencia';
import { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';


export const GestionarAsistencia = ({ uri }) => {
    const [data, setData] = useState([]);
    const [id_clase, setIdClase] = useState(null);
    const [isformVisible, setIsFormVisible] = useState(false);
    const [isListVisible, setIsListVisible] = useState(true);

    const handleFormAsistencia = (id_clase) => {
        setIdClase(id_clase);
        setIsFormVisible(true);
        setIsListVisible(false);
    }

    const handleCancelar = () => {
        setIsFormVisible(false);
        setIsListVisible(true);
        console.log('cancelar');
    }

    useEffect(() => {
        const fetchData = async () => {
            if (uri) {
                console.log(localStorage.getItem('profesor'));
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
        <div>
            {isListVisible &&
                <div className='classlist'>
                    {data.map((item) => (
                       <Accordion
                       sx={{ width: '50vw' ,
                       display:'flex',flexDirection:'column'
                       , marginBottom:'1vw',backgroundColor:'#f5f5f5'
                    }}
                       key={item.id_clase}>

                            <AccordionSummary
                           
                            >
                                <div
                                style={{textTransform:'uppercase',padding:'10px',width:'100%'}}
                                className='classlist__item'>
                                    <div className='classlist__item__title'>
                                        <h3>{item.nombre}</h3>
                                    </div>
                                    <div
                                    style={{justifyContent:'space-between'}}
                                    className='classlist__item__content'>
                                        <span>{item.fecha}</span>
                                        <span>Horario: {item.horario} - {item.dia}</span>
                                        <p> Cod: {item.cod_clase}</p>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='classlist__item__actions'>
                                    <button onClick={() => handleFormAsistencia(item.id_clase)}>Tomar asistencia</button>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            }

            {isformVisible && <FormularioAsistencia id_clase={id_clase} onCancel={handleCancelar} />}
        </div>

    );
};
