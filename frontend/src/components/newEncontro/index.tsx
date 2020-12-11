import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Container, Row, MailIcon, PasswordIcon } from "./style";

import api from '../../services/api';

interface Props {
    eterapia_id: string,
    turnOffEncontro: () => void,
    renderFatherAgain: () => void,
}

const NewEncontro: React.FC<Props> = ({ eterapia_id, turnOffEncontro, renderFatherAgain }) => {
    const [app, setApp] = useState('');

    function handleDataTime() {
        const date = new Date()
        return date
    }

    async function createEncontro(e: Event) {
        e.preventDefault();

        try{
            const response = await api.post('encontro', {
                eterapia_id: eterapia_id,
                dateTime: handleDataTime(),
                app: app
            },
            {
                headers: {
                    Authorization: localStorage.getItem('auth') as string
                }
            })
            renderFatherAgain()
            turnOffEncontro()
        }catch(err) {
            // alert(err)
            console.log(err)
            setApp('')
        }
    }

    return (
        <Container>
            <form onSubmit={createEncontro as any}>
                <Row>
                    <li>
                        <input 
                            placeholder="Aplicativo que será usado"
                            value={app}
                            onChange={e => setApp(e.target.value)}
                             />
                    </li>
                    <button className="informationButtons" type="submit">Criar</button>
                </Row>
            </form>
        </Container>
    );
};

export default NewEncontro;
