import { Button } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, ScheduleIcon, ClockIcon, PeopleIcon} from './style';

interface Props {
    date: string,
    time: string,
    people: number,
}

const Information: React.FC<Props> = ({
    date,
    time,
    people
}) => {

    const navigate = useNavigate();
    return (
        <Container>
            <h2>Informações</h2>
            <Row>
                <li>
                    <ScheduleIcon />
                    <p>{date}</p>
                </li>
                <li>
                    <ClockIcon />
                    <p>{time}</p>
                </li>
                <li>
                    <PeopleIcon />
                    <p>{people}</p>
                </li>
                {/* <Button className='informationButtons'
                    onClick={ () => {
                        localStorage.setItem('id', dataNavigate.id)
                        localStorage.setItem('eterapia_id', dataNavigate.eterapia_id)
                        localStorage.setItem('auth', dataNavigate.auth)
                        navigate('/frequency')
                    }
                }
                >Lista de Presença</Button> */}
            </Row>
        </Container>
    );
};

export default Information;