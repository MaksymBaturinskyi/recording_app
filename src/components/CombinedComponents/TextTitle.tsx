import React from 'react';
import {theme} from "../../styles/theme";
import {Text} from "../SimpleComponents";

type TitleProps = {
    title : string;
    mt?: string[];
}
const TextTitle = ({title, mt = ['0px']}: TitleProps) => {
    return (
        <Text
            mt={mt}
            fontFamily={theme.fontFamily.ebgaramond}
            fontWeight={700}
            fontSize={[32,32,33]}
            lineHeight={theme.lineHeights.title}
            width={"100%"}
        >
            {title}
        </Text>
    );
};

export default TextTitle;
