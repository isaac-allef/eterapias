import styled, { css } from 'styled-components';
import { RiGroupLine, RiBuilding4Line, RiMapPin2Line, RiMailLine, RiLinksLine } from 'react-icons/ri'

export const Container = styled.div``;

export const Flex = styled.div`
    display: flex;
    align-items: center;

    > div{
        margin-left: 24px;

        > h1{
            font-size: 26px;
            line-height: 1.25;
            color: white;
            justify-self: center;
            font-weight: 300;
        }

        > h2{
            font-size: 20px;
            color: white;
            font-weight: 300;
        }
    }

    @media (min-width: 768px){
        flex-direction: column;
        align-items: flex-start;

        > div{
            margin-left: 0;
            margin-top: 16px;
        }
    }

`;

export const Avatar = styled.img`
    width: 20%;
    border-radius: 50%;
    margin-top: 20px;

    @media (min-width: 768px){
        width: 100%;
    }
`;

export const Row = styled.ul`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px 0;

    > li {
        display: flex;
        align-items: center;

        > span{
            font-size: 14px;
            color: var(--gray);
        }
        > *{
            margin-right: 5px;
        }
    }
`;

export const Column = styled.ul`
    margin-bottom: 20px;
`;

const iconCSS = css`
    width: 16px;
    height: 16px;
    //fill: var(--icon);
    flex-shrink: 0;
`;

export const PeopleIcon = styled(RiGroupLine)`${iconCSS}`;
export const CompanyIcon = styled(RiBuilding4Line)`${iconCSS}`;
export const LocationIcon = styled(RiMapPin2Line)`${iconCSS}`;
export const EmailIcon = styled(RiMailLine)`${iconCSS}`;
export const BlogIcon = styled(RiLinksLine)`${iconCSS}`;