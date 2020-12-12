import React, { useEffect, useState } from 'react';

import { Container, Main, RightSide, Repos, RepoIcon, Tab } from './style';
import MeetingCard from '../../components/MeetingCard';
import LeftSide from '../../components/LeftSide';

import api from '../../services/api';

const Profile: React.FC = () => {
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
        id: string,
        auth: string,
        perfilUser: perfilUser,
    }
    const dataNavigate:dataNavigate = {
        id: localStorage.getItem('id') as string,
        auth: localStorage.getItem('auth') as string,
        perfilUser: JSON.parse(localStorage.getItem('perfilUser') as string),
    }

    const { id, auth, perfilUser } = dataNavigate;
    const moderador_id = id;

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
        getEterapias(moderador_id)
    }, []);

    useEffect(() => {
        addNumberOfParticipants()
    }, [eterapias]);

    const TabContent = () => (
        <div className="content">
            <RepoIcon />
            <span className="label">
                e-Terapias
            </span>
                <span className="number">{eterapias.length}</span>
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
                <LeftSide perfilUser={perfilUser} />
                <RightSide>
                    <Tab className="mobile">
                        <TabContent />
                    </Tab>
                    <Repos>
                        <div>
                            {eterapiasPlus.map(eterapia => (
                                <MeetingCard
                                    key={eterapia['id']}
                                    dataNavigate={{
                                        eterapia_id: eterapia['id'],
                                    }}
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