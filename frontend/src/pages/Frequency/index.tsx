import React from 'react';

import { Container, Main, RightSide, RepoIcon } from './style';
import LeftSide from '../../components/LeftSide';
import Register from '../../components/Register';

import AttendanceList from '../../components/attendanceList';

const Frequency: React.FC = () => {

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

    return (
        <Container>
            <Main>
                <LeftSide perfilUser={perfilUser} />
                <RightSide>
                    <h2 className='titles'>{ eterapia_title }</h2>
                    <h2 className='titles'>{`Lista de Presença: ${ encontro_dataTime }`}</h2>
                    {/* <Register
                    name={'Arraia'}
                    date={'17/10'}
                    frequency={4}
                    /> */}
                    <AttendanceList 
                        auth = {auth}
                        eterapia_id = {Number(eterapia_id)}
                        encontro_id = {Number(encontro_id)}
                    />
                </RightSide>
            </Main>
        </Container>
    );
};

export default Frequency;