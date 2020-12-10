import React, { useEffect, useState } from 'react';

import { Container, Main, RightSide, RepoIcon, Tab } from './style';
import LeftSide from '../../components/LeftSide';
import Description from '../../components/Description';
import Participants from '../../components/Participants';
import Information from '../../components/Information';

import api from '../../services/api';
import Encontros from '../../components/Encontros';

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
    }

    interface dataNavigate {
        eterapia_id: string,
        auth: string,
        perfilUser: perfilUser,
    }
    const dataNavigate:dataNavigate = {
        eterapia_id: localStorage.getItem('eterapia_id') as string,
        auth: localStorage.getItem('auth') as string,
        perfilUser: JSON.parse(localStorage.getItem('perfilUser') as string),
    }

    const { eterapia_id, auth, perfilUser } = dataNavigate;

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
                <LeftSide perfilUser={perfilUser} />
                <RightSide>
                {eterapiaPlus.map(eterapia => (
                    <div key={eterapia['id']}>
                        <h2 className='titles'>{ eterapia['title'] }</h2>
                        <Description description={ eterapia['description'] }/>
                        <div className="part-info">
                            <Encontros dataNavigate={
                                {
                                    eterapia_id: eterapia['id'],
                                    eterapia_title: eterapia['title'],
                                    auth: auth,
                                }
                            } data={encontros} />
                            <Information
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