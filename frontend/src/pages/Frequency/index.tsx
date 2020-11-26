import React from 'react';

import { Container, Main, RightSide, RepoIcon, Tab } from './style';
import LeftSide from '../../components/LeftSide';
import Register from '../../components/Register';

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
                </RightSide>
            </Main>
        </Container>
    );
};

export default Frequency;