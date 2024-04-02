import React, { FC } from 'react';
import styled from 'styled-components';
import {
	color,
	ColorProps,
	layout,
	LayoutProps,
	space,
	SpaceProps,
	typography,
	TypographyProps,
} from 'styled-system';

interface TextInputInterface
	extends SpaceProps,
		LayoutProps,
		ColorProps,
		TypographyProps {
	onChangeText: (textValue: string) => void;
	value?: string;
}

const StyledTextInput = styled.input<TextInputInterface>`
	${space}
	${layout}
    ${color}
    ${typography}
`;

export const SimpleInput: FC<TextInputInterface> = props => {
	return <StyledTextInput {...props} />;
};
