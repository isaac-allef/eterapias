import styled from "styled-components";
import { RiBookMarkLine } from "react-icons/ri";

export const Container = styled.div`
    --horizontalPadding: 16px;
    --verticalPadding: 24px;

    padding: var(--verticalPadding) var(--horizontalPadding);
    overflow: hidden;
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;

    margin: 0 auto;
    max-width: 1280px;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const RightSide = styled.div`
    padding: 0 var(--horizontalPadding);

    .titles {
        margin-top: 10px;
        color: black;
    }

    @media (min-width: 768px) {
        width: 75%;
    }

    .part-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;

export const RepoIcon = styled(RiBookMarkLine)`
    width: 16px;
    height: 16px;
    margin-right: 4px;
`;

export const FieldArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;

    .btnSave {
        width: 100px;
        height: 30px;
        margin: 20px;
        font-size: 14px;
        background: #86c36b;
        border-radius: 5px;
        align-self: center;
    }

    .journalText {
        background-color: #86c36b;
        width: 100%;
        height: 300px;
        border-radius: 5px;
        border: 1px solid green;
        opacity: 0.8;
        /* border-width: 10px; */
        /* border-color: red; */
    }
`;

// export const textarea = styled.textarea`
    
// `;
