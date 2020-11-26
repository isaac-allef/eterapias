import React from 'react';

import { Container, Main, RightSide, Repos, RepoIcon, Tab } from './style';
import RepoCard from '../../components/RepoCard';
import LeftSide from '../../components/LeftSide';

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
                <LeftSide />
                <RightSide>
                    <Tab className="mobile">
                        <TabContent />
                    </Tab>
                    <Repos>
                        <div>
                            {[1, 2, 3, 4, 5, 6].map(n => (
                                <RepoCard
                                    key={n}
                                    username={'Maria Luíza'}
                                    reponame={'Oficina de Meditação'}
                                    description={'Sessão via Google Meet'}
                                    dayOfWeek={n % 2 === 0 ? 'Segunda' : 'Terça'}
                                    clock={'10h'}
                                    people={2}
                                />
                            ))}
                        </div>
                    </Repos>
                </RightSide>
            </Main>
        </Container>
    );
};

export default Profile;