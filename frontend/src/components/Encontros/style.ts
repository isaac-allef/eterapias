import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 16px;
    margin-top: 20px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: #9ec98b;
    min-width: 50%;
    max-height: 180px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    .btnAdd {
        background-color: #49cc06;
    }
`;

export const Row = styled.ul`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 10px 0;

    > h2 {
        font-size: 20px;
        font-weight: 600;
    }

    > li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        > p {
            font-size: 14px;
            color: var(--gray);
        }
    }
`;

export const AlterDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;

    > button {
        padding: 0px;
    }
`;
