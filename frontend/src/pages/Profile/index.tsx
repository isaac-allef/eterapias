import React, { useEffect, useState } from 'react';

import { Container, Main, RightSide, Repos, RepoIcon, Tab } from './style';
import RepoCard from '../../components/RepoCard';
import LeftSide from '../../components/LeftSide';

import api from '../../services/api';

const Profile: React.FC = () => {
    const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2ODQxNzU0LCJleHAiOjE2MDY5MjgxNTR9.oLsk6NyzF9g9RfPCmGaX8F3Qzwr7xbrrhjiqNjzcWec'
    const [eterapias, setEterapias] = useState([]);
    const [eterapiasPlus, setEterapiasPlus] = useState([])

    const getEterapias = async (moderador_id: string) => {
        const response = await api.get(`eterapias?moderador_id=${moderador_id}`, {
            headers: {
                Authorization: auth
            }
        })
        setEterapias(response.data.result);
    }

    const addNumberOfParticipants = async () => {
        const result = await Promise.all(eterapias.map( async (eterapia:object, index:number) => {
            const id = (eterapias[index]['id'])
            return ({...eterapia, numberOfParticipants: await getNumberOfParticipants(id)})
        })) as any;
        setEterapiasPlus(result)
    }
    
    const getNumberOfParticipants = async (eterapia_id: string) => {
        const response = await api.get(`participantes?eterapia_id=${eterapia_id}`, {
            headers: {
                Authorization: auth
            }
        })
        return response.data.result.length;
    }

    useEffect(() => {
        getEterapias('1')
    }, []);

    useEffect(() => {
        addNumberOfParticipants()
    }, [eterapias]);

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
                            {eterapiasPlus.map(eterapia => (
                                <RepoCard
                                    key={eterapia['id']}
                                    username={'Maria Luíza'}
                                    reponame={eterapia['title']}
                                    description={eterapia['description']}
                                    dayOfWeek={eterapia['dayOfWeek']}
                                    clock={eterapia['clock']}
                                    people={eterapia['numberOfParticipants']}
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