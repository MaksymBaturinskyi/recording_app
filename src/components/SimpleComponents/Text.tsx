import React, { FC } from 'react';
import styled from 'styled-components';
import {
	space,
	layout,
	color,
	typography,
	SpaceProps,
	LayoutProps,
	ColorProps,
	TypographyProps,
} from 'styled-system';

interface TextInterface
	extends SpaceProps,
		LayoutProps,
		ColorProps,
		TypographyProps {
	children: string | number;
}

const StyledText = styled.Text<TextInterface>`
	${space}
	${layout}
    ${color}
    ${typography}
`;

export const Text: FC<TextInterface> = ({ children, ...rest }) => (
	<StyledText {...rest}>{children}</StyledText>
);
