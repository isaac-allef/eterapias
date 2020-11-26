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
        color: black;
        margin-top: 10px;
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

export const Tab = styled.div`
    background: var(--primary);

    .content {
        display: flex;
        align-items: center;
        width: min-content;

        padding: 14px 16px;

        border-bottom: 2px solid var(--orange);

        .label {
            font-size: 14px;
            padding: 0 7px;
            font-weight: 600;
        }
        .number {
            font-size: 12px;
            background: var(--ticker);
            padding: 2px 6px;
            border-radius: 24px;
        }
    }

    .line {
        display: flex;
        width: 200vw;
        border-bottom: 1px solid var(--border);
        margin-left: -50vw;
    }

    &.mobile {
        margin-top: var(--verticalPadding);

        .content {
            margin: 0 auto;
        }

        @media (min-width: 768px) {
            display: none;
        }
    }

    &.desktop {
        display: none;

        @media (min-width: 768px) {
            display: unset;

            .wrapper {
                display: flex;
                margin: 0 auto;
                max-width: 1280px;
            }

            .offset {
                width: 25%;
                margin-right: var(--horizontalPadding);
            }
        }
    }
`;

export const RepoIcon = styled(RiBookMarkLine)`
    width: 16px;
    height: 16px;
    margin-right: 4px;
`;