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
	border,
	BorderProps,
} from 'styled-system';

interface TextInputInterface
	extends SpaceProps,
		LayoutProps,
		ColorProps,
		TypographyProps,
		BorderProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	placeholder?: string;
}

const StyledTextInput = styled.input<TextInputInterface>`
	${space}
	${layout}
    ${color}
    ${typography}
    ${border}
`;

export const SimpleInput: FC<TextInputInterface> = props => {
	return <StyledTextInput {...props} />;
};
