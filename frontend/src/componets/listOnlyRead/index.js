import { useState, useEffect } from 'react';
import ReactDataSheet from 'react-datasheet';
// import 'componets/list/node_modules/react-datasheet/lib/react-datasheet.css';

import api from '../../services/api';

export default function ListOnlyRead({ auth }) {
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
                { readOnly: true, value: participante.fullName },
                { readOnly: true, value: participante.email },
            ])
        }
        setList(
            <ReactDataSheet key={'a'}
                data={list}
                valueRenderer={cell => cell.value}
            />
        )
    }

    useEffect(() => {
        getData();
    });

    return (
        <div className="list-container">
            {list}
      </div>
    );
}