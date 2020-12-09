import React, { useEffect, useState } from 'react';

import { Container, Main, RightSide, RepoIcon, Tab } from './style';
import LeftSide from '../../components/LeftSide';
import Description from '../../components/Description';
import Participants from '../../components/Participants';
import Information from '../../components/Information';

import api from '../../services/api';
import Encontros from '../../components/Encontros';

const Profile: React.FC = () => {
    interface dataNavigate {
        id: string,
        eterapia_id: string,
        auth: string
    }
    const dataNavigate:dataNavigate = {
        id: localStorage.getItem('id') as string,
        eterapia_id: localStorage.getItem('eterapia_id') as string,
        auth: localStorage.getItem('auth') as string,
    }

    const { id, eterapia_id, auth } = dataNavigate;
    const moderador_id = id;

    const [eterapia, setEterapia] = useState([]);
    const [eterapiaPlus, setEterapiaPlus] = useState([])
    const [participantes, setParticipantes] = useState([])
    const [encontros, setEncontros] = useState([])

    const getEterapia = async (id: string) => {
        const response = await api.get(`eterapias?id=${id}`, {
            headers: {
                Authorization: auth
            }
        })
        setEterapia(response.data.result);
    }

    const getParticipants = async (eterapia_id: string) => {
        const response = await api.get(`participantes?eterapia_id=${eterapia_id}`, {
            headers: {
                Authorization: auth
            }
        })
        setParticipantes(response.data.result);
    }

    const getEncontros = async (eterapia_id: string) => {
        const response = await api.get(`encontros?eterapia_id=${eterapia_id}`, {
            headers: {
                Authorization: auth
            }
        })
        setEncontros(response.data.result);
    }

    const addParticipants = async () => {
        // let e = eterapia[0]
        try{
            const result = {...eterapia[0] as any, participants: participantes, numberOfParticipants: participantes.length}
            setEterapiaPlus([result] as any)
        }catch(err) {
            console.log(err)
        }
    }
    

    useEffect(() => {
        getEterapia(eterapia_id)
    }, []);

    useEffect(() => {
        getParticipants(eterapia_id)
        getEncontros(eterapia_id)
    }, [eterapia]);

    useEffect(() => {
        addParticipants()
    }, [participantes]);

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
                <LeftSide id={moderador_id} auth={auth} />
                <RightSide>
                {eterapiaPlus.map(eterapia => (
                    <div>
                        <h2 className='titles'>{ eterapia['title'] }</h2>
                        <Description description={ eterapia['description'] }/>
                        <div className="part-info">
                            <Encontros dataNavigate={
                                {
                                    eterapia_id: eterapia['id'],
                                    auth: auth,
                                }
                            } data={encontros} />
                            <Information
                                dataNavigate={dataNavigate}
                                date={ eterapia['dayOfWeek'] }
                                time={ eterapia['clock'] }
                                people={eterapia['numberOfParticipants']}
                            />
                        </div>
                        <Participants data={participantes} />
                    </div>
                ))}
                </RightSide>
            </Main>
        </Container>
    );
};

export default Profile;