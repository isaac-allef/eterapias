import React, { useEffect, useState } from "react";

import { Container } from './style';

import ProfileData from '../ProfileData';
import { CardProps } from "@material-ui/core";

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

interface Props {
    perfilUser: perfilUser
}

const LeftSide: React.FC<Props> = ({ perfilUser }) => {

    return (
        <Container>
            <ProfileData
                key={perfilUser['id']}
                name={perfilUser['fullName']}
                avatarUrl={
                    "https://upload.wikimedia.org/wikipedia/commons/7/7d/Wildlife_at_Maasai_Mara_%28Lion%29.jpg"
                }
                company={perfilUser['college']}
                location={`${perfilUser['uf']}, ${perfilUser['city']}`}
                email={perfilUser['email']}
                profissional={perfilUser['professional']}
            />
        </Container>
    );
};

export default LeftSide;
