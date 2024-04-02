import React, { FC } from 'react';
import styled from 'styled-components';
import {
	space,
	layout,
	color,
	border,
	BorderProps,
	SpaceProps,
	LayoutProps,
	ColorProps,
	flexbox,
	justifyContent,
	position,
	shadow,
} from 'styled-system';
import { BlockInterface } from './Block';

interface ButtonInterface
	extends BlockInterface,
		BorderProps,
		SpaceProps,
		LayoutProps,
		ColorProps {
	onPress: () => void;
	children: React.ReactNode;
}

const StyledButton = styled.button<ButtonInterface>`
	${color}
	${space}
    ${layout}
    ${position}
    ${border}
    ${flexbox}
    ${shadow}
    ${justifyContent}
`;

export const Button: FC<ButtonInterface> = ({ children, ...rest }) => (
	<StyledButton {...rest}>{children}</StyledButton>
);
