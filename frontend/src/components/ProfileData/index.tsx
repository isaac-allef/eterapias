import React from 'react';

import { Container, Flex, Avatar, Column, CompanyIcon, LocationIcon, BlogIcon } from './styles';

interface Props {
    name: string;
    avatarUrl: string;
    company?: string;
    location?: string;
    email?: string;
    profissional?: string;
}

const ProfileData: React.FC<Props> = ({
    name,
    avatarUrl,
    company,
    location,
    email,
    profissional,
}) => {
    return (
        <Container>
            <Flex>
                <Avatar src={avatarUrl} alt={name} />
                <div>
                    <h1>{name}</h1>
                    <h2>{email}</h2>
                </div>
            </Flex>
            <br/>
            <Column>
                {company && (
                    <li>
                        <CompanyIcon />
                        <span>{company}</span>
                    </li>
                )}
                {location && (
                    <li>
                        <LocationIcon />
                        <span>{location}</span>
                    </li>
                )}
                {profissional && (
                    <li>
                        <BlogIcon />
                        <span>{profissional}</span>
                    </li>
                )}
            </Column>

        </Container>
    );
};

export default ProfileData;