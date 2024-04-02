import React, { FC } from 'react';

import styled from 'styled-components';
import { layout, LayoutProps, space, SpaceProps } from 'styled-system';

interface ImageInterface extends SpaceProps, LayoutProps {
	source: any;
}

const StyledImage = styled.image<ImageInterface>`
	${space}
	${layout}
`;

export const Image: FC<ImageInterface> = props => <StyledImage {...props} />;
