import React from 'react';
import { Link } from 'react-router-dom';

import { Container, TopSide, ScheduleIcon, BotSide, ClockIcon, PeopleIcon } from './styles';

interface Props {
    username: string;
    reponame: string;
    description?: string;
    dayOfWeek?: string;
    clock: string;
    people: number;
}

const RepoCard: React.FC<Props> = ({
    username,
    reponame,
    description,
    dayOfWeek,
    clock,
    people,
}) => {

    const dayOfWeekClass = dayOfWeek ? dayOfWeek.toLowerCase() : 'other';

    return (
        <Container>
            <TopSide>
                <header>
                    <ScheduleIcon />
                    <Link to={`/${username}/${reponame}`}> {reponame} </Link>
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

export default RepoCard;