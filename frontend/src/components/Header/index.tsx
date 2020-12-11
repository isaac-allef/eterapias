import React from "react";
import logo from "../../assets/logo-terapias.png";
import localLogo from "../../assets/brasao.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Container } from "./styles";

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <img id="Logo" src={logo} />
            <h1>
                <Link className="link" to="/profile">
                    E-Terapias
                </Link>
            </h1>
            <div className='btnEnd'>
                <Button
                    className="btnSair"
                    onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}
                    style={{ WebkitTextFillColor: "white" }}
                >
                    Sair
                </Button>
            </div>
            <img id="LocalLogo" src={localLogo} />
        </Container>
    );
};

export default Header;
