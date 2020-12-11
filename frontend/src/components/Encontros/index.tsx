import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewEncontro from '../newEncontro';

import { Container, Row } from './style';

import api from '../../services/api';

interface dataNavigate {
    eterapia_id: string,
    eterapia_title: string,
    auth: string,
}

interface Encontro {
    id: string,
    dateTime: string,
    app: string,
}

interface Props {
    dataNavigate: dataNavigate,
    data: Encontro[];
}

const Encontros: React.FC<Props> = ({
    dataNavigate,
    data,
}) => {
    const navigate = useNavigate();
    const [newEncontro, setNewEncontro] = useState(<div></div>);
    const [encontros, setEncontros] = useState(data)
    const [page, setPage] = useState(1)

    const getEncontros = async (eterapia_id: string, page?: string) => {
        if (page){
            const response = await api.get(`encontros?page=${page}&ascDesc=desc&eterapia_id=${eterapia_id}`, {
                headers: {
                    Authorization: dataNavigate.auth
                }
            })
            setEncontros(response.data.result);
        } else {
            const response = await api.get(`encontros?ascDesc=desc&eterapia_id=${eterapia_id}`, {
                headers: {
                    Authorization: dataNavigate.auth
                }
            })
            setEncontros(response.data.result);
        }

    }

    async function renderAgain() {
        await getEncontros(dataNavigate.eterapia_id)
    }

    async function changePage(page:string) {
        await getEncontros(dataNavigate.eterapia_id, page)
    }

    function turnOnEncontro() {
        setNewEncontro(
            <div>
                <Button onClick={turnOffEncontro}>X</Button>
                <NewEncontro
                    eterapia_id={dataNavigate.eterapia_id}
                    turnOffEncontro={turnOffEncontro}
                    renderFatherAgain={renderAgain}
                 />
            </div>
        )
    }

    function turnOffEncontro() {
        setNewEncontro(<div></div>)
    }

    async function deleteEncontro(id: string) {
        try{
            const response = await api.delete(`encontro/${id}`,
            {
                headers: {
                    Authorization: dataNavigate.auth
                }
            })
            renderAgain()
        }catch(err) {
            // alert(err)
            console.log(err)
        }
    }

    return (
        <Container>
            <h2>Encontros</h2>
            <Button className='btnAdd' onClick={turnOnEncontro} >Adicionar</Button>
            {newEncontro}
            {
                encontros.map(encontro => (
                    <Row key={encontro.id}>
                        <li>
                            <Button className='informationButtons'
                                    onClick={ () => {
                                        localStorage.setItem('eterapia_id', dataNavigate.eterapia_id)
                                        localStorage.setItem('encontro_id', encontro.id)
                                        localStorage.setItem('eterapia_title', dataNavigate.eterapia_title)
                                        localStorage.setItem('encontro_dataTime', encontro.dateTime)
                                        navigate('/frequency')
                                    }
                                }
                                >
                                    <p>{ encontro.dateTime } | </p>
                                    <p> { encontro.app }</p>
                                </Button>
                            <Button onClick={async () => await deleteEncontro(encontro.id)} >Excluir</Button>
                        </li>
                    </Row>
                ))
            }
            <Button onClick={() => {
                const p = page-1
                setPage(p)
                changePage(p.toString())
            }
            }>-</Button>
            {page}
            <Button onClick={() => {
                const p = page+1
                setPage(p)
                changePage(p.toString())
            }
            }>+</Button>
        </Container>
    );
};

export default Encontros;