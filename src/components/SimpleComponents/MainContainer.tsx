import styled from 'styled-components';
import {Block} from "./Block";
import {layout} from "styled-system";

export const MainContainer = styled(Block)`
    height: 100vh;
    position: relative;
    flex-direction: column;
    ${layout}
`;
