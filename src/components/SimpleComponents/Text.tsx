import React, {FC} from 'react';
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
    textStyle,
    TextStyleProps,
} from 'styled-system';

interface TextInterface
    extends SpaceProps,
        LayoutProps,
        ColorProps,
        TypographyProps,
        TextStyleProps {
    children: string | number;
    textDecoration?: string;
    textIndent?: string;

}

const StyledText = styled.p<TextInterface>`
    ${space}
    ${layout}
    ${color}
    ${typography}
    ${textStyle}
    ${({textDecoration}) => textDecoration && `text-decoration: ${textDecoration}`}
    ${({textIndent}) => textIndent && `text-indent: ${textIndent}`}
`;

export const Text: FC<TextInterface> = ({children, ...rest}) => (
    <StyledText {...rest}>{children}</StyledText>
);
