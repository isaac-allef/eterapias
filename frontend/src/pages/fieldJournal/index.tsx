import React, { useEffect, useState } from 'react';

import { Container, Main, RightSide, RepoIcon } from './style';
import LeftSide from '../../components/LeftSide';

import AttendanceList from '../../components/attendanceList';

import api from '../../services/api';

import { 
    parseISO, 
    format, 
  } from 'date-fns';

import pt from 'date-fns/locale/pt';
import { Button } from '@material-ui/core';


const FieldJournal: React.FC = () => {
    const [fieldJournal, setFieldJournal] = useState([]);

    const getFieldJournal = async (moderador_id: string, encontro_id: string) => {
        const response = await api.get(`diarios?moderador_id=${moderador_id}&encontro_id=${encontro_id}`, {
            headers: {
                Authorization: auth
            }
        })
        setFieldJournal(response.data.result);
    }

    interface fieldJournal {
        description: string
    }
    const updateFieldJournal = async (fieldJournal_id: string, value: fieldJournal) => {
        const response = await api.put(`diario/${fieldJournal_id}`, value, {
            headers: {
                Authorization: auth
            }
        })
    }

    interface perfilUser {
        id: string,
        userName: string
        fullName: string,
        email: string,
        whatsapp_tel: string,
        city: string,
        uf: string,
        college: string,
        professional: string
    }

    interface dataNavigate {
        eterapia_id: string,
        encontro_id: string,
        eterapia_title: string,
        encontro_dataTime: string,
        auth: string,
        perfilUser: perfilUser,
    }
    const dataNavigate:dataNavigate = {
        eterapia_id: localStorage.getItem('eterapia_id') as string,
        encontro_id: localStorage.getItem('encontro_id') as string,
        eterapia_title: localStorage.getItem('eterapia_title') as string,
        encontro_dataTime: localStorage.getItem('encontro_dataTime') as string,
        auth: localStorage.getItem('auth') as string,
        perfilUser: JSON.parse(localStorage.getItem('perfilUser') as string),
    }

    const { eterapia_id, encontro_id,eterapia_title, encontro_dataTime, auth, perfilUser } = dataNavigate;

    const [textAreaValue, setTextAreaValue] = useState();

    useEffect(() => {
        getFieldJournal(dataNavigate.perfilUser.id, dataNavigate.encontro_id)
    }, []);

    useEffect(() => {
        const [value] = fieldJournal.map(fj => fj['description'])
        setTextAreaValue(value)
    }, [fieldJournal]);

    const formattedDate = format(
        parseISO(encontro_dataTime), 
        "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
        {locale: pt}
      );

    return (
        <Container>
            <Main>
                <LeftSide perfilUser={perfilUser} />
                <RightSide>
                    <h2 className='titles'>{ eterapia_title }</h2>
                    <h2 className='titles'>{`Diário de campo: ${ formattedDate }`}</h2>
                    <textarea value={textAreaValue} onChange={ (e) => { 
                        setTextAreaValue(e.target.value as any)
                    }} />
                    <Button
                     onClick={
                         () => {
                            try {
                                const [id] = fieldJournal.map(fj => fj['id'])
                                const value = {
                                    description: textAreaValue || ''
                                }
                                updateFieldJournal(
                                    id,
                                    value
                                )
                                alert('Salvo!')
                            }catch(err) {
                                alert(`Não salvo!`)
                                console.log(err)
                            }
                         }
                     }
                    >Salvar</Button>
                </RightSide>
            </Main>
        </Container>
    );
};

export default FieldJournal;