import React from 'react';

import { Container, Main, RightSide, RepoIcon, Tab } from './style';
import LeftSide from '../../components/LeftSide';
import Register from '../../components/Register';

import AttendanceList from '../../components/attendanceList';

const Frequency: React.FC = () => {
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
                        auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2NDEzODI4LCJleHAiOjE2MDY1MDAyMjh9.Dj0H2cnpDWbt9Ua2yJOl88XgOmaLKhkQwpquh9PD-Ak'
                        eterapia_id = {1}
                        encontro_id = {1}
                    />
                </RightSide>
            </Main>
        </Container>
    );
};

export default Frequency;