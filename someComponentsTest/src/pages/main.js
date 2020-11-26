// import List from '../componets/list';
// import ListOnlyRead from '../componets/listOnlyRead';
import Sheet from '../componets/sheet';
import AttendanceList from '../componets/attendanceList';

export default function Main() {
    return(
        <div>
            {/* <List
                auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2MzI3MjY4LCJleHAiOjE2MDY0MTM2Njh9.Xlp4Iojj4JXSttJidoBZ6lQPKViEV-KBqMU-fiAWAmg'
             /> */}
            {/* <ListOnlyRead
                auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2MzI3MjY4LCJleHAiOjE2MDY0MTM2Njh9.Xlp4Iojj4JXSttJidoBZ6lQPKViEV-KBqMU-fiAWAmg'
                /> */}
            <div>
                <Sheet
                    auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2NDEzODI4LCJleHAiOjE2MDY1MDAyMjh9.Dj0H2cnpDWbt9Ua2yJOl88XgOmaLKhkQwpquh9PD-Ak'
                    link = '1V99TulQLFGNPYHUDo5vRK8ZK566P762bVToosLFOvzA'
                />
            </div>
            <div>
                <AttendanceList 
                    auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2NDEzODI4LCJleHAiOjE2MDY1MDAyMjh9.Dj0H2cnpDWbt9Ua2yJOl88XgOmaLKhkQwpquh9PD-Ak'
                    eterapia_id = {1}
                    encontro_id = {1}
                />
            </div>
        </div>
    );
}