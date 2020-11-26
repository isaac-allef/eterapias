import React from 'react';

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
                <button className='informationButtons'>Relatórios</button>
                <button className='informationButtons'>Lista de Presença</button>
            </Row>
        </Container>
    );
};

export default Information;