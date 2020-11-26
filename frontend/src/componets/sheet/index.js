import { useState, useEffect } from 'react';
import ReactDataSheet from 'react-datasheet';
// import 'componets/list/node_modules/react-datasheet/lib/react-datasheet.css';
import './styles.css'

import api from '../../services/api';

import ProgressBar from '../progressBar'

export default function Sheet({ auth, link }) {

    const [list, setList] = useState([]);
    const [num, setNum] = useState(0);
    const [tap, setTap] = useState([]);
    const [sheets, setSheets] = useState([]);

    const [completed, setCompleted] = useState(0);
    const [progressBar, setProgressBar] = useState(0);

    useEffect(() => {
        if(!sheets.length){
            setProgressBar(setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000));
        }
        else{
            clearInterval(progressBar)
            setProgressBar(0)
        }
    }, [sheets]);

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
    }, [sheets]);

    return (
        <div className="list-container">
            <div className="tap-container">
                {tap}
            </div>
            {list}
            <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
        </div>
    );
}