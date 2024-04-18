import React from 'react';
import {theme} from "../../styles/theme";
import {Text} from "../SimpleComponents";

type TextProps = {
    top? : string;
    bottom?: string;
}

const TextMicPermissions = ({top, bottom}: TextProps) => {
    return (
        <Text
            position={'absolute'}
            bottom={bottom}
            top={top}
            mt={'10px'}
            fontFamily={theme.fontFamily.inter}
            fontWeight={400}
            fontSize={14}
            color={theme.colors.colorSecondaryRed}
        >
            Please go to settings and allow mic permissions.
        </Text>
    );
};

export default TextMicPermissions;
