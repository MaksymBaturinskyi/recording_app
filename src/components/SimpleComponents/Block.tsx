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
	JustifyContentProps,
} from 'styled-system';

export interface BlockInterface
	extends SpaceProps,
		LayoutProps,
		ColorProps,
		BorderProps,
		FlexProps,
		JustifyContentProps {
	children: React.ReactNode;
	br?: string;
}

export const StyledBlock = styled.div<BlockInterface>`
	${color}
	${space}
    ${layout}
    ${position}
    ${border}
    ${flexbox}
    ${shadow}
    ${justifyContent}
    ${({ br, theme }): string | undefined =>
		br && `border-radius: ${theme.radii[br]}px`};
`;
export const Block: FC<BlockInterface> = ({ children, ...rest }) => (
	<StyledBlock {...rest}>{children}</StyledBlock>
);
