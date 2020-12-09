import React from 'react';

import { Container, Row } from './style';

interface Participante {
    id: number,
    fullName: string,
    email: string,
    whatsapp_tel: string,
    city: string,
    uf: string,
    sex: string,
}

interface Props {
    data: Participante[];
}

const Participants: React.FC<Props> = ({
    data,
}) => {
    return (
        <Container>
            <h2>Participantes</h2>
            {
                data.map(participante => (
                    <Row key={participante.id}>
                        <li>
                            <p>{ participante.fullName } | </p>
                            <p>{ participante.email }</p>
                        </li>
                    </Row>
                ))
            }
        </Container>
    );
};

export default Participants;