import React from "react";

import { Container } from './style';

import ProfileData from '../ProfileData';

const LeftSide: React.FC = () => {
    return (
        <Container>
            <ProfileData
                name={"Maria Luíza"}
                avatarUrl={
                    "https://upload.wikimedia.org/wikipedia/commons/7/7d/Wildlife_at_Maasai_Mara_%28Lion%29.jpg"
                }
                company={"Universidade Estadual de Santa Cruz"}
                location={"Bahia, Brazil"}
                email={"luiza_maria98@hotmail.com"}
                profissional={"Psicóloga"}
            />
        </Container>
    );
};

export default LeftSide;
