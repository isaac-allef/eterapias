import { useState, useEffect } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

import api from '../../services/api';

export default function List({ auth }) {
    const [list, setList] = useState([]);
    const getData = async () => {
        const response = await api.get('participantes', {
            headers: {
                Authorization: auth
            }
        });
        const participantes = response.data.result;
        let list = [
            [
                { readOnly: true, value: 'id' },
                { readOnly: true, value: 'fullName' },
                { readOnly: true, value: 'email' },
            ]
        ];
        for(const participante of participantes) {
            list.push([
                { readOnly: true, value: participante.id },
                { value: participante.fullName },
                { value: participante.email },
                {   
                    value: 'Delete',
                    component: (<button onClick={() => handleDeleteUser(participante.id)}>Delete</button>),
                    forceComponent: true
                }
            ])
        }
        setList(
            <ReactDataSheet key={'a'}
                data={list}
                valueRenderer={cell => cell.value}
                onCellsChanged={changes => {
                    const row = changes['0']['row']
                    const col = changes['0']['col']
                    const id = list[row]['0']['value']
                    let data = changes['0']['value']
                    if (col === 1) data = { fullName: data }
                    if (col === 2) data = { email: data }
                    handleUpdate(id, data)
                }}
            />
        )
    }

    useEffect(() => {
        getData();
    });

    async function handleDeleteUser(id) {
        try {
            console.log('deleted')
            await api.delete(`participante/${id}`, {
                headers: {
                    Authorization: auth
                }
            });
        }catch(err) {
            alert(err);
        }
    }

    async function handleUpdate(id, data) {
        try {
            const response = await api.put(`participante/${id}`, data, {
                headers: {
                    Authorization: auth
                }
            });
        } catch(err) {
            alert(err);
        }
    }

    return (
        <div className="list-container">
            {list}
      </div>
    );
}