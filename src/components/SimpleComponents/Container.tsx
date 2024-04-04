import styled from 'styled-components';
import {Block} from "./Block";
import {layout} from "styled-system";


export const Container = styled(Block)`
    margin: 0 auto;
	width: 100%;
	max-width: 1200px;
	padding-left: 20px;
	padding-right: 20px;
    ${layout}
`;
