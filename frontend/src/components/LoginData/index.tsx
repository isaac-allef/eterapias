import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Container, Row, MailIcon, PasswordIcon } from "./style";

import api from '../../services/api';

const Frequency: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    async function handleLogin(e: Event) {
        e.preventDefault();

        try{
            const response = await api.post('authenticate', { userName, password})
            localStorage.setItem('id', response.data.user.id)
            localStorage.setItem('auth', 'Bearer '+response.data.token)
            localStorage.setItem('perfilUser', JSON.stringify(response.data.user)); {/** fazer com que esses dados sejam utilizados no componente LeftSide, pq esse componente está pegando essas informações do servidor toda vez que é chamada */}
            navigate('/profile')
        }catch(err) {
            alert("Usuário não autorizado!")
            setUserName('')
            setPassword('')
        }
    }

    return (
        <Container>
            <h1 className="titles">Login</h1>
            <h2 className="titles">Administradores</h2>
            <span className="line" />
            <form onSubmit={handleLogin as any}>
                <Row>
                    <li>
                        <MailIcon />
                        <input 
                            placeholder="Digite o seu e-mail"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                             />
                    </li>
                    <li>
                        <PasswordIcon />
                        <input type="password" placeholder="Digite a sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                    </li>
                    <button className="informationButtons" type="submit">Acessar</button>
                </Row>
            </form>
        </Container>
    );
};

export default Frequency;
