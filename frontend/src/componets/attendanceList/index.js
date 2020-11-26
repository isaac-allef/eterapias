import { useState, useEffect } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import './styles.css'

import api from '../../services/api';

export default function AttendanceList({ auth, eterapia_id, encontro_id }) {
    const [participantes, setParticipantes] = useState([]);
    const [list, setList] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);

    const getAttendanceList = async () => {
        const response = await api.get(`presencas?encontro_id=${encontro_id}`, {
            headers: {
                Authorization: auth
            }
        });
        const presencas = response.data.result;
        const list = presencas.map(presenca => (
            {
                participante_id: presenca.participante_id,
                encontro_id: presenca.encontro_id
            }
        ))
        setAttendanceList(list)
    }

    const checked = (id) => {
        const participante = attendanceList.find(p => p.participante_id === id)
        if (participante)
            return true
        return false
    }

    const getParticipantes = async () => {
        const response = await api.get(`participantes?eterapia_id=${eterapia_id}`, {
            headers: {
                Authorization: auth
            }
        });
        const participantes = response.data.result;
        setParticipantes(participantes)
    }

    const createList = async () => {

        let list = [
            [
                { readOnly: true, value: 'id' },
                { readOnly: true, value: 'fullName' },
                { readOnly: true, value: 'email' },
                { readOnly: true, value: '' },
            ]
        ];
        for(const participante of participantes) {
            list.push([
                { readOnly: true, value: participante.id },
                { value: participante.fullName },
                { value: participante.email },
                {   
                    value: 'check',
                    component: (
                        <span className="value-viewer">
                        <input
                            name="attendance"
                            type="checkbox"
                            // checked={participante.id === 1 ? true : false}
                            // defaultChecked={false}
                            defaultChecked={checked(participante.id)}
                            onChange={(e) => {
                                let checked = e.target.checked;
                                if(checked)
                                    pushAttendance(participante.id, encontro_id)
                                else
                                    removeAttendance(participante.id, encontro_id)
                            }} />
                            </span>
                    ),
                    forceComponent: true
                }
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
        getAttendanceList();
        getParticipantes();
    }, []);

    useEffect(() => {
        createList();
    }, [participantes, attendanceList]);


    async function deleteAttendanceList() {
        await api.delete('presenca', { 
            data: { encontro_id },
            headers: {
                Authorization: auth
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    async function pushAttendanceList() {
        if(attendanceList.length) {
            await deleteAttendanceList()
            try {
                await api.post('presenca', attendanceList, {
                    headers: {
                        Authorization: auth
                    }
                });
                alert('List saved')
            }catch(err) {
                alert(err);
            }
        } else {
            await deleteAttendanceList()
            alert('List deleted')
        }
    }

    function pushAttendance(participante_id, encontro_id) {
        const data = { participante_id, encontro_id }
        
        let list = attendanceList
        list.push(data)
        setAttendanceList(
            list
        )
    }

    function removeAttendance(participante_id, encontro_id) {
        const data = { participante_id, encontro_id }
        
        let list = attendanceList
        list = list.filter(attendance => !(attendance.participante_id === data.participante_id && attendance.encontro_id === data.encontro_id))
        setAttendanceList(
            list
        )
    }

    return (
        <div className="list-container">
            {list}
            <button onClick={pushAttendanceList}>Submit</button>
      </div>
    );
}