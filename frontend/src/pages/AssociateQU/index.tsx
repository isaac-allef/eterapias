import React from "react";

import { Container } from './style';
import TableUsersAnswers from "../../components/TableUsersAnswers";

// ASSOCIATE QU = ASSOCIATE QUESTIONS AND USERS
const AssociateQU: React.FC = () => {
    return (
        <Container>
            <TableUsersAnswers />
        </Container>
    );
};

export default AssociateQU;
