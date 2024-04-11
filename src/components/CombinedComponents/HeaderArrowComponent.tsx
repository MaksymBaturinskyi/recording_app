import React from 'react';
import {theme} from "../../styles/theme";
import Arrow from "../../assets/icons/arrow_down.svg";
import {Block} from "../SimpleComponents";

const HeaderArrowComponent = () => {
    return (
        <Block
            width={'100%'}
            height={'52px'}
            marginBottom={[0,0,32]}
            borderRadius={20}
            paddingLeft={[0,0,30.5]}
            paddingTop={'4px'}
            alignItems={'center'}
            backgroundColor={['transparent','transparent', theme.colors.colorSecBg]}
        >
            <img src={Arrow} alt="play" style={{
                width: "28px",
                height: "26px"
            }}/>
        </Block>
    );
};

export default HeaderArrowComponent;
