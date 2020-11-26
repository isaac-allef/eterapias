import React from 'react';

import { Container, Row, PersonIcon, ClockIcon, ChartIcon } from './style';

interface Props {
    name: string,
    date: string,
    frequency: number,
}

const Information: React.FC<Props> = ({
    name,
    date,
    frequency,
}) => {
    return (
        <Container>
            <div className='right'>
                <div className='clockTime'>
                    <ClockIcon />
                </div>
                <div className='chartFrequency'>
                    <ChartIcon />
                </div>
            </div>
            <Row>
                <li>
                    <PersonIcon />
                    <p>{name}</p>
                    <span className='firstSpan'>{date}</span>
                    <input
                    className="isGoing"
                    type="checkbox"
                    />
                </li>
                <li>
                    <PersonIcon />
                    <p>{name}</p>
                    <span className='firstSpan'>{date}</span>
                    <input
                    className="isGoing"
                    type="checkbox"
                    />
                </li>
                <li>
                    <PersonIcon />
                    <p>{name}</p>
                    <span className='firstSpan'>{date}</span>
                    <input
                    className="isGoing"
                    type="checkbox"
                    />
                </li>
            </Row>
        </Container>
    );
};

export default Information;