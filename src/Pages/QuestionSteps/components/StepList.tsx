import React from 'react';
import {Block, Text} from "../../../components/SimpleComponents";
import {theme} from "../../../styles/theme";

const stepsListData = [
    "1. Record a question",
    "2. Invite your relatives to answer",
    "3. We'll store it in your family history vault forever",
]
const StepList = () => {
    return (
        <Block
            mt={40}
            flexDirection={"column"}
            width={"100%"}
        >
            {
                stepsListData.map((step: string, index: number) => {
                    return (
                        <Block
                            key={index}
                        >
                            <Text
                                fontWeight={400}
                                fontSize={18}
                                color={theme.colors.colorTextGray}
                                fontFamily={theme.fontFamily.inter}
                                textIndent={"-21px"}
                                paddingLeft={"30px"}
                            >
                                {step}
                            </Text>
                        </Block>
                    );
                })
            }
        </Block>
    );
};

export default StepList;
