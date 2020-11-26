import { useState, useEffect } from 'react';
import ReactDataSheet from 'react-datasheet';
// import 'componets/list/node_modules/react-datasheet/lib/react-datasheet.css';
import './styles.css'

import api from '../../services/api';

export default function Sheet({ auth, link }) {
    const [list, setList] = useState([]);
    const [num, setNum] = useState(0);
    const [tap, setTap] = useState([]);
    const [sheet, setSheet] = useState([]);

    const getData = async () => {
        const response = await api.post('loadDataSheet', {
            link_id: link
        }, {
            headers: {
                Authorization: auth
            }
        });
        const sheets = response.data.sheets;
        setSheet(sheets)
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

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        try{
            setList(
                <ReactDataSheet key={'resolver: a key tem que ser única'}
                    data={sheet[num].grid}
                    valueRenderer={cell => cell.value}
                />
            )
        }catch(err) {
            console.log(err)
        }
    }, [num]);

    return (
        <div className="list-container">
            <div className="tap-container">
                {tap}
            </div>
            {list}
        </div>
    );
}