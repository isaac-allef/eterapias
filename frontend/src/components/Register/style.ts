import styled, { css } from "styled-components";

import { GrClock, GrBarChart } from "react-icons/gr";
import { BsFillPersonFill } from "react-icons/bs";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    margin-top: 20px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: #9ec98b;
    min-width: 40%;

    .right {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 50px;
    }

    .chartFrequency {
        display: flex;
        flex-direction: column;
        margin-right: 200px;
    }

    .clockTime {
        display: flex;
        flex-direction: column;
        margin-right: 20px;
    }
`;

export const Row = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 10px 0 0 70px;

    .isGoing {
        width: 1.3em;
        height: 1.3em;
        background-color: white;
        border-radius: 50%;
        vertical-align: middle;
        border: 1px solid #ddd;
        -webkit-appearance: none;
        outline: none;
        cursor: pointer;
    }

    .isGoing:checked {
        background-color: #C36B6B;
    }

    > li {
        display: flex;
        align-items: center;

        > p {
            font-size: 14px;
            color: var(--gray);
        }
        > * {
            margin-right: 5px;
        }

        .firstSpan {
            margin-left: 450px;
        }
        > span {
            justify-self: flex-end;
            margin-left: 5px;
        }
    }

    > li + li {
        margin-top: 10px;
    }
`;

const iconCSS = css`
    width: 16px;
    height: 16px;
    fill: var(--icon);
    flex-shrink: 0;
`;

export const ClockIcon = styled(GrClock)`
    ${iconCSS}
`;

export const ChartIcon = styled(GrBarChart)`
    ${iconCSS}
`;

export const PersonIcon = styled(BsFillPersonFill)`
    ${iconCSS}
`;
