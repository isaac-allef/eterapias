import React from 'react';
import logo from '../../assets/logo-terapias.png';
import localLogo from '../../assets/brasao.png';

import { Container } from './styles';

const Header: React.FC = () => {
    return (
        <Container>
            <img id='Logo' src={logo} />
            <h1>E-terapias</h1>
            <img id='LocalLogo' src={localLogo} />
        </Container>
    );
};

export default Header;