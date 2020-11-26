import styled, { css } from 'styled-components';

import { GrSchedules, GrClock } from 'react-icons/gr';
import { IoIosPeople } from 'react-icons/io';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    margin-top: 20px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: #9EC98B;
    min-width: 40%;
`;

export const Row = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 20px 0;

    > h2 {
        font-size: 20px;
        font-weight: 600;
    }

    > li {
        display: flex;
        align-items: center;

        > p{
            font-size: 14px;
            color: var(--gray);
        }
        > *{
            margin-right: 5px;
        }
    }

    > li + li {
        margin-top: 10px;
    }

    > button {
        align-self: center;
        width: 80%;
        height: 30px;
        margin-top: 10px;
        background: #86C36B;
        border-radius: 5px;
    }
`;

const iconCSS = css`
    width: 16px;
    height: 16px;
    fill: var(--icon);
    flex-shrink: 0;
`;

export const ClockIcon = styled(GrClock)`${iconCSS}`;

export const ScheduleIcon = styled(GrSchedules)`${iconCSS}`;

export const PeopleIcon = styled(IoIosPeople)`${iconCSS}`;

