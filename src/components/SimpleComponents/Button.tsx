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
	onClick: () => void;
	children: React.ReactNode;
	cursor?: string;
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
	cursor: pointer;
`;

export const Button: FC<ButtonInterface> = ({ children, ...rest }) => (
	<StyledButton {...rest}>{children}</StyledButton>
);
