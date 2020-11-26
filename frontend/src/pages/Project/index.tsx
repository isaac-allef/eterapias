import React from 'react';

import { Container, Main, RightSide, RepoIcon, Tab } from './style';
import LeftSide from '../../components/LeftSide';
import Description from '../../components/Description';
import Participants from '../../components/Participants';
import Information from '../../components/Information';

const Profile: React.FC = () => {
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
                    <Description description={'TESTANDO'}/>
                    <div className="part-info">
                        <Participants name={'Arraia'} />
                        <Information
                            date={'14/11'}
                            time={'15h'}
                            people={10}
                        />
                    </div>
                </RightSide>
            </Main>
        </Container>
    );
};

export default Profile;