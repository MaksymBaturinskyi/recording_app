import React, {FC} from 'react';
import styled from 'styled-components';
import {
    space,
    layout,
    color,
    border,
    typography,
    SpaceProps,
    LayoutProps,
    ColorProps,
    TypographyProps,
    textStyle,
    TextStyleProps, PositionProps, position, BorderProps,
} from 'styled-system';

interface TextInterface
    extends SpaceProps,
        LayoutProps,
        ColorProps,
        BorderProps,
        TypographyProps,
        PositionProps,
        TextStyleProps {
    children: React.ReactNode;
    textDecoration?: string;
    textIndent?: string;

}

const StyledText = styled.p<TextInterface>`
    ${space}
    ${layout}
    ${border}
    ${color}
    ${position}
    ${typography}
    ${textStyle}
    ${({textDecoration}) => textDecoration && `text-decoration: ${textDecoration}`}
    ${({textIndent}) => textIndent && `text-indent: ${textIndent}`}
`;

export const Text: FC<TextInterface> = ({children, ...rest}) => (
    <StyledText {...rest}>{children}</StyledText>
);
