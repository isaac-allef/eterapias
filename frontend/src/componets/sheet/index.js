import { useState, useEffect } from 'react';
import ReactDataSheet from 'react-datasheet';
// import 'componets/list/node_modules/react-datasheet/lib/react-datasheet.css';
import './styles.css'

import Loading from '../loading'

import api from '../../services/api';

export default function Sheet({ auth, link }) {

    const [list, setList] = useState([]);
    const [num, setNum] = useState(0);
    const [tap, setTap] = useState([]);
    const [sheets, setSheets] = useState([]);

    const getSheets = async () => {
        const response = await api.post('loadDataSheet', {
            link_id: link
        }, {
            headers: {
                Authorization: auth
            }
        });
        setSheets(response.data.sheets)
    }

    const createListWithTap = () => {
        if(sheets.length) {
            setList(
                <ReactDataSheet key={'resolver: a key tem que ser única'}
                    data={sheets[num].grid}
                    valueRenderer={cell => cell.value}
                />
            )
            setTap(sheets.map((sheet, index) => (
                    <button onClick={() => setNum(index)}>{sheet.titleSheet}</button>
                ))
            )
        }
    }

    useEffect(() => {
        getSheets();
    }, []);

    useEffect(() => {
        createListWithTap();
    }, [sheets, num]);

    return (
        <div className="list-container">
            <div className="tap-container">
                {tap}
            </div>
            {sheets.length ? list : <Loading />}
        </div>
    );
}