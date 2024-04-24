import React, { useState } from 'react';
import axios from 'axios';
import { configToken } from '../utilities/funciones';
import FormularioAsistencia from './formAsistencia';
import { useEffect } from 'react';

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
                        <div
                            onClick={() => handleFormAsistencia(item.id_clase)}
                            key={item.id_clase}>
                            <p>{item.id_clase}</p>
                            <p>{item.nombre}</p>
                            <p>{item.descripcion}</p>
                            <br />
                        </div>
                    ))}
                </div>
            }

            {isformVisible && <FormularioAsistencia id_clase={id_clase} onCancel={handleCancelar} />}
        </div>

    );
};
