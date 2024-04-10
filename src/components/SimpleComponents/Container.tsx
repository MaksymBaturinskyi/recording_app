import styled from 'styled-components';
import {Block} from "./Block";
import {layout} from "styled-system";
import {useWindowSize} from "../../helpers/useWindowSize";

export const Container = styled(Block)`
    margin: 0 auto;
	width: 100%;
	max-width: 1259px;
	padding-left: 20px;
	padding-right: 20px;
    ${layout}
`;
