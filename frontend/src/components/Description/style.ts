import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    margin-top: 20px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: #9EC98B;
`;

export const Row = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;

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
`;
