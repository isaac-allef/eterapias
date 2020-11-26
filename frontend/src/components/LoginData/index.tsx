import React from "react";

import { Container, Row, MailIcon, PasswordIcon } from "./style";

const Frequency: React.FC = () => {
    return (
        <Container>
            <h1 className="titles">Login</h1>
            <h2 className="titles">Administradores</h2>
            <span className="line" />
            <Row>
                <li>
                    <MailIcon />
                    <input placeholder="Digite o seu e-mail" />
                </li>
                <li>
                    <PasswordIcon />
                    <input type="password" placeholder="Digite a sua senha" />
                </li>
                <button className="informationButtons">Acessar</button>
                <button className="informationButtons">Cadastre-se</button>
            </Row>
        </Container>
    );
};

export default Frequency;
