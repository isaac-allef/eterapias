import styled, { css } from "styled-components";

import { RiMailLine, RiLockPasswordLine } from "react-icons/ri";

export const Container = styled.div`
    > h1, h2 {
        text-align: center;
    }

    .line {
        display: flex;
        border-bottom: 2px solid white;
    }
`;

export const Row = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px 0;

    > li {
        display: flex;
        align-items: center;
        margin: 20px;

        > input {
            margin-left: 20px;
            width: 200px;
            height: 30px;
            background: #86c36b;
        }

        > input::placeholder {
            font-weight: unset;
            font-size: 15px;
            color: black;
            padding-left: 10px;
        }
    }

    > li + li {
        margin-top: 10px;
    }

    > button {
        width: 80%;
        height: 30px;
        margin: 10px 0;
        background: #86c36b;
        border-radius: 5px;
    }
`;

const iconCSS = css`
    width: 20px;
    height: 20px;
    fill: black;
    flex-shrink: 0;
`;

export const MailIcon = styled(RiMailLine)`${iconCSS}`;

export const PasswordIcon = styled(RiLockPasswordLine)`${iconCSS}`;
