import React from 'react';

import { Container, Row } from './style';

interface Props {
    name: string;
}

const Participants: React.FC<Props> = ({
    name,
}) => {
    return (
        <Container>
            <h2>Participantes</h2>
            <Row>
                <li>
                    <p>{name}</p>
                </li>
            </Row>
        </Container>
    );
};

export default Participants;