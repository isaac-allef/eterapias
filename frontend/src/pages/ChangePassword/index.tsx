import React from "react";

import { Container, Main } from "./style";
import RecoverData from "../../components/ChangePasswordData";

const RecoverPassword: React.FC = () => {
    return (
        <Container>
            <Main>
                <RecoverData />
            </Main>
        </Container>
    );
};

export default RecoverPassword;
