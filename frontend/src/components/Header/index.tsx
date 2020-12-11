import React from 'react';
import logo from '../../assets/logo-terapias.png';
import localLogo from '../../assets/brasao.png';

import { Container } from './styles';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <img id='Logo' src={logo} />
            <h1>E-terapias</h1>
            <img id='LocalLogo' src={localLogo} />
            <Button
                onClick={() => {
                    localStorage.clear()
                    navigate('/')
                }}
                style={{WebkitTextFillColor: 'white'}}
            >Sair</Button>
        </Container>
    );
};

export default Header;