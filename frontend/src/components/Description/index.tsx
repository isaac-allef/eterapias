import React from 'react';

import { Container, Row } from './style';

interface Props {
    description: string;
}

const Description: React.FC<Props> = ({
    description
}) => {
    return (
        <Container>
            <Row>
                <li>
                    <h2>Descrição</h2>
                </li>
                <li>
                    <p>{description}</p>
                </li>
            </Row>
        </Container>
    );
};

export default Description;