import { Button } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row } from './style';

interface dataNavigate {
    eterapia_id: string,
    eterapia_title: string,
    auth: string,
}

interface Encontro {
    id: string,
    dateTime: string,
    app: string,
}

interface Props {
    dataNavigate: dataNavigate,
    data: Encontro[];
}

const Encontros: React.FC<Props> = ({
    dataNavigate,
    data,
}) => {
    const navigate = useNavigate();
    return (
        <Container>
            <h2>Encontros</h2>
            {
                data.map(encontro => (
                    <Row key={encontro.id}>
                        <li>
                            <Button className='informationButtons'
                                    onClick={ () => {
                                        localStorage.setItem('eterapia_id', dataNavigate.eterapia_id)
                                        localStorage.setItem('encontro_id', encontro.id)
                                        localStorage.setItem('eterapia_title', dataNavigate.eterapia_title)
                                        localStorage.setItem('encontro_dataTime', encontro.dateTime)
                                        navigate('/frequency')
                                    }
                                }
                                >
                                    <p>{ encontro.dateTime } | </p>
                                    <p> { encontro.app }</p>
                                </Button>
                        </li>
                    </Row>
                ))
            }
        </Container>
    );
};

export default Encontros;