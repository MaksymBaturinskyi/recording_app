import React, {FC, MouseEvent} from 'react';
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
	onClick: (e:MouseEvent) => void;
	children: React.ReactNode;
	cursor?: string;
	disabled?: boolean;
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
	transition: all 0.3s ease;

	&:hover {
		opacity: 0.8;
	}

	&:active {
		opacity: 0.6;
	}
`;

export const Button: FC<ButtonInterface> = ({ children, ...rest }) => (
	<StyledButton {...rest}>{children}</StyledButton>
);
