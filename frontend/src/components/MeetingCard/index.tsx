import { Button } from '@material-ui/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container, TopSide, ScheduleIcon, BotSide, ClockIcon, PeopleIcon } from './styles';

interface dataNavigate {
    eterapia_id: string,
}

interface Props {
    dataNavigate: dataNavigate;
    reponame: string;
    description?: string;
    dayOfWeek?: string;
    clock: string;
    people: number;
}

const MeetingCard: React.FC<Props> = ({
    dataNavigate,
    reponame,
    description,
    dayOfWeek,
    clock,
    people,
}) => {

    const dayOfWeekClass = dayOfWeek ? dayOfWeek.toLowerCase() : 'other';
    const navigate = useNavigate()

    return (
        <Container>
            <TopSide>
                <header>
                    <ScheduleIcon />
                    <Button onClick={ () => {
                            localStorage.setItem('eterapia_id', dataNavigate.eterapia_id)
                            navigate('/project')
                        }
                    }> {reponame} </Button>
                </header>
                <p>{description}</p>
            </TopSide>

            <BotSide>
                <ul>
                    <li>
                        <div className={`dayOfWeek ${dayOfWeekClass}`}/>
                        <span>{dayOfWeek}</span>
                    </li>
                    <li>
                        <ClockIcon />
                        <span>{clock}</span>
                    </li>
                    <li>
                        <PeopleIcon />
                        <span>{people}</span>
                    </li>
                </ul>
            </BotSide>

        </Container>
    );
};

export default MeetingCard;