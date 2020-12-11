import { useState, useEffect } from "react";
import "./styles.css";
import { Container } from './styles.css'
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
    withStyles,
    Theme,
    createStyles,
    makeStyles,
} from "@material-ui/core/styles";

import api from "../../services/api";

export default function AttendanceList({ auth, eterapia_id, encontro_id }) {
    const [participantes, setParticipantes] = useState([]);
    const list = {};
    const [attendanceList, setAttendanceList] = useState([]);

    const getAttendanceList = async () => {
        const response = await api.get(`presencas?encontro_id=${encontro_id}`, {
            headers: {
                Authorization: auth,
            },
        });
        const presencas = response.data.result;
        const list = presencas.map((presenca) => ({
            participante_id: presenca.participante_id,
            encontro_id: presenca.encontro_id,
        }));
        setAttendanceList(list);
    };

    const checked = (id) => {
        const participante = attendanceList.find(
            (p) => p.participante_id === id
        );
        if (participante) return true;
        return false;
    };

    const getParticipantes = async () => {
        const response = await api.get(
            `participantes?eterapia_id=${eterapia_id}`,
            {
                headers: {
                    Authorization: auth,
                },
            }
        );
        const participantes = response.data.result;
        setParticipantes(participantes);
    };

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    const StyledTableCell = withStyles((theme) =>
        createStyles({
            head: {
                backgroundColor: theme.palette.success.light
                ,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        })
    )(TableCell);

    const StyledTableRow = withStyles((theme) =>
        createStyles({
            root: {
                "&:nth-of-type(odd)": {
                    backgroundColor: theme.palette.action.hover,
                },
            },
        })
    )(TableRow);

    useEffect(() => {
        getParticipantes();
    }, []);

    useEffect(() => {
        getAttendanceList();
    }, [participantes]);

    async function deleteAttendanceList() {
        const response = await api.get(`presencas?encontro_id=${encontro_id}`);
        if (response.data.result.length) {
            await api
                .delete("presenca", {
                    data: { encontro_id },
                    headers: {
                        Authorization: auth,
                    },
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    async function pushAttendanceList() {
        if (attendanceList.length) {
            await deleteAttendanceList();
            try {
                await api.post("presenca", attendanceList, {
                    headers: {
                        Authorization: auth,
                    },
                });
                alert("List saved");
            } catch (err) {
                alert(err);
            }
        } else {
            await deleteAttendanceList();
            alert("List deleted");
        }
    }

    function pushAttendance(participante_id, encontro_id) {
        const data = { participante_id, encontro_id };

        let lista = attendanceList;
        lista.push(data);
        setAttendanceList(lista);
    }

    function removeAttendance(participante_id, encontro_id) {
        const data = { participante_id, encontro_id };

        let list = attendanceList;
        list = list.filter(
            (attendance) =>
                !(
                    attendance.participante_id === data.participante_id &&
                    attendance.encontro_id === data.encontro_id
                )
        );
        setAttendanceList(list);
    }

    const classes = useStyles();

    return (
        <div className='tableAndBtn'>
            <TableContainer component={Paper} className='TableMargin'>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                Check de Presença
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Nome Completo
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                E-mail
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {participantes.map((participante) => (
                            <StyledTableRow key={participante.fullName}>
                                <StyledTableCell component="th" scope="row">
                                    <input
                                        name="attendance"
                                        type="checkbox"
                                        // checked={participante.id === 1 ? true : false}
                                        // defaultChecked={false}
                                        defaultChecked={checked(
                                            participante.id
                                        )}
                                        onChange={(e) => {
                                            let checked = e.target.checked;
                                            if (checked)
                                                pushAttendance(
                                                    participante.id,
                                                    encontro_id
                                                );
                                            else
                                                removeAttendance(
                                                    participante.id,
                                                    encontro_id
                                                );
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {participante.fullName}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {participante.email}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <button className='btnSubmit' onClick={pushAttendanceList}>Atualizar</button>
        </div>
    );
}
