import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

interface Column {
    id: "id" | "name" | "email" | "phone" | "local";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "E-mail", minWidth: 100 },
    {
        id: "phone",
        label: "Phone",
        minWidth: 170,
        align: "right",
    },
    {
        id: "local",
        label: "Local",
        minWidth: 170,
        align: "right",
    },
];

interface Data {
    id: number;
    name: string;
    email: string;
    phone: string;
    local: string;
}

function createData(
    id: number,
    name: string,
    email: string,
    phone: string,
    local: string
) {
    return { id, name, email, phone, local };
}

const rows = [
    createData(1, "India", "324171354", "3287263", "Brasil"),
    createData(1, "China", "403500365", "9596961", "Brasil"),
    createData(1, "Italy", "60483973", "301340", "Brasil"),
    createData(1, "United States", "327167434", "9833520", "Brasil"),
    createData(1, "Canada", "37602103", "9984670", "Brasil"),
    createData(1, "Australia", " 25475400", "7692024", "Brasil"),
    createData(1, "Germany", "83019200", " 357578", "Brasil"),
    createData(1, "Ireland", "4857000", "70273", "Brasil"),
    createData(1, "Mexico", "12657769", "1972550", "Brasil"),
    createData(1, "Japan", "126317000", " 377973", "Brasil"),
    createData(1, "France", "67022000", "640679", "Brasil"),
    createData(1, "United Kingdom", "67545757", "242495", "Brasil"),
    createData(1, "Russia", "46793744", "1098246", "Brasil"),
    createData(1, "Nigeria", "200962417", " 923768", "Brasil"),
    createData(1, "Brazil", "210147125", "8515767", "Brasil"),
];

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export default function TableUsersAnswers() {
    const classes = useStyles();
    const [row, setRows] = React.useState(rows);

    const handleInfo = function (event: React.ChangeEvent<HTMLInputElement>){
        const letter = event.target.value;
        console.log(letter);
        if (letter === ""){
            return setRows(rows);
        }
        const newRows = rows.filter(element => {
            return (element.name.toLowerCase()).indexOf(letter) !== -1;
        });
        setRows(newRows);
        //console.log(row);
    }

    return (
        <Paper className={classes.root}>
            <form>
                <input type="text" placeholder="Filter Name" onChange={handleInfo} />
            </form>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row
                            .map((element) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={element.name}
                                    >
                                        {columns.map((column) => {
                                            const value = element[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
