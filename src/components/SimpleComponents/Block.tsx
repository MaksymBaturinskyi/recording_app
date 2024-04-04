import React, { FC } from 'react';
import styled from 'styled-components';
import {
	space,
	layout,
	color,
	flexbox,
	shadow,
	position,
	border,
	SpaceProps,
	LayoutProps,
	ColorProps,
	FlexProps,
	justifyContent,
	BorderProps,
	FlexboxProps,
	JustifyContentProps,
	PositionProps,
} from 'styled-system';

export interface BlockInterface
	extends SpaceProps,
		LayoutProps,
		ColorProps,
		BorderProps,
		FlexProps,
		FlexboxProps,
		JustifyContentProps,
		PositionProps {
	children?: React.ReactNode;
	br?: string;
	boxShadow?: string;
	transform?: string;
}

export const StyledBlock = styled.div<BlockInterface>`
	display: flex;
	${color}
	${space}
    ${layout}
    ${position}
    ${border}
    ${flexbox}
    ${shadow}
    ${justifyContent}
    ${({ br, theme }): string | undefined => br && `border-radius: ${theme.radii[br]}px`};
    ${({transform}): string | undefined => transform && `transform: ${transform}`};
`;
export const Block: FC<BlockInterface> = ({ children, ...rest }) => (
	<StyledBlock {...rest}>{children}</StyledBlock>
);
