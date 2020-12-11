import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

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
            localStorage.setItem('perfilUser', JSON.stringify(response.data.user));
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
            <h2 className="titles">Moderadores</h2>
            <span className="line" />
            <form onSubmit={handleLogin as any}>
                <Row>
                    <li>
                        <MailIcon />
                        <input 
                            placeholder="Digite o seu usuário"
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
                    <Link className='linkPassword' to="change-password">Mudar senha</Link>
                </Row>
            </form>
            
        </Container>
    );
};

export default Frequency;
