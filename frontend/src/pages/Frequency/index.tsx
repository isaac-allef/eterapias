import React from 'react';

import { Container, Main, RightSide, RepoIcon, Tab } from './style';
import LeftSide from '../../components/LeftSide';
import Register from '../../components/Register';

import AttendanceList from '../../components/attendanceList';

const Frequency: React.FC = () => {
    interface dataNavigate {
        eterapia_id: string,
        encontro_id: string,
        auth: string
    }
    const dataNavigate:dataNavigate = {
        eterapia_id: localStorage.getItem('eterapia_id') as string,
        encontro_id: localStorage.getItem('encontro_id') as string,
        auth: localStorage.getItem('auth') as string,
    }

    const { eterapia_id, encontro_id, auth } = dataNavigate;

    const TabContent = () => (
        <div className="content">
            <RepoIcon />
            <span className="label">
                Projetos
            </span>
            <span className="number">6</span>
        </div>
    );

    return (
        <Container>
            <Tab className="desktop">
                <div className="wrapper">
                    <span className="offset" />
                        <TabContent />
                </div>
                <span className="line" />
            </Tab>
            <Main>
                <LeftSide/>
                <RightSide>
                    <h2 className='titles'>Oficina de Meditação</h2>
                    <h2 className='titles'>Lista de Presença</h2>
                    <Register
                    name={'Arraia'}
                    date={'17/10'}
                    frequency={4}
                    />
                    <AttendanceList 
                        auth = {auth}
                        eterapia_id = {eterapia_id}
                        encontro_id = {encontro_id}
                    />
                </RightSide>
            </Main>
        </Container>
    );
};

export default Frequency;