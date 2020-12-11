import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { Container, Row, MailIcon, PasswordIcon } from "./style";

import api from '../../services/api';

const RecoverPasswordData: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate()

    async function handleChangePassword(e: Event) {
        e.preventDefault();

        try{
            await api.put('moderadorLoginPass', { userName, password, newPassword})
            alert('Senha alterada com sucesso!')
            navigate('/')
        }catch(err) {
            alert("Usuário não autorizado!")
            setUserName('')
            setPassword('')
            setNewPassword('')
        }
    }

    return (
        <Container>
            <h1 className="titles">Alterar senha</h1>
            <h2 className="titles">Moderadores</h2>
            <span className="line" />
            <form onSubmit={handleChangePassword as any}>
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
                    <li>
                        <PasswordIcon />
                        <input type="password" placeholder="Digite sua nova senha"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        />
                    </li>
                    <button className="informationButtons" type="submit">Acessar</button>
                    <Link className='linkLogin' to="/">Login</Link>
                </Row>
            </form>
            
        </Container>
    );
};

export default RecoverPasswordData;
