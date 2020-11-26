import styled, { css } from 'styled-components';
import { GrSchedules, GrClock } from 'react-icons/gr';
import { IoIosPeople } from 'react-icons/io';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: #9EC98B;
`;

export const TopSide = styled.div`
    > header {
        display: flex;
        align-items: center;

        > a {
            margin-left: 8px;
            font-size: 18px;
            font-weight: 600;
            color: white;

            text-decoration: none;

            &:focus, &:hover {
                text-decoration: underline;
            }
        }
    }

    > p{
        margin: 8px 0 16px;
        font-size: 12px;
        color: var(--gray);
        letter-spacing: 0.1px;
    }
`;

export const BotSide = styled.div`
    > ul {
        display: flex;
        align-items: center;

        > li {
            display: flex;
            align-items: center;
            margin-right: 16px;

            > span {
                margin-left: 5px;
                font-size: 12px;
                color: var(--gray);
            }
        }
    }

    .dayOfWeek {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;

        &.segunda {
            background: var(--segunda);
        }
        &.terça {
            background: var(--terça);
        }
    }
`;

const iconCSS = css`
    width: 16px;
    height: 16px;
    fill: var(--icon);
    flex-shrink: 0;
`;

export const ScheduleIcon = styled(GrSchedules)`${iconCSS}`;

export const ClockIcon = styled(GrClock)`${iconCSS}`;

export const PeopleIcon = styled(IoIosPeople)`${iconCSS}`;
