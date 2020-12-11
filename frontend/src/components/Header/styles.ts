import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    background: var(--header);
    padding: 11px 16px;

    #Logo {
        width: 70px;
        height: 50px;
        flex-shrink: 0;
    }

    #LocalLogo {
        width: 40px;
        height: 50px;
        flex-shrink: 0;
    }

    .link {
        padding-left: 50px;
        color: white;
        text-decoration: none;
    }

    .btnEnd {
        align-items: center;
        margin-left: auto;
    }

`;

