import React, { useEffect, useState } from "react";

import { Container } from './style';

import ProfileData from '../ProfileData';
import { CardProps } from "@material-ui/core";

import api from '../../services/api';

interface Props {
    id?: string;
    auth?: string;
}

const LeftSide: React.FC<Props> = ({ id, auth }) => {
    const [moderador, setModerador] = useState([]);
    
    const getModerador = async (moderador_id: string) => {
        const response = await api.get(`moderadores?id=${moderador_id}`, {
            headers: {
                Authorization: auth
            }
        })
        setModerador(response.data.result);
    }

    useEffect(() => {
        getModerador(id as string);
    }, [id]);

    return (
        <Container>
            {moderador.map(m => (
                <ProfileData
                    key={m['id']}
                    name={m['fullName']}
                    avatarUrl={
                        "https://upload.wikimedia.org/wikipedia/commons/7/7d/Wildlife_at_Maasai_Mara_%28Lion%29.jpg"
                    }
                    company={m['college']}
                    location={`${m['uf']}, ${'city'}`}
                    email={m['email']}
                    profissional={"Técnico"} // ainda está estático pq o backend ainda não fornesse essa informação
                />
            ))
            }
        </Container>
    );
};

export default LeftSide;
