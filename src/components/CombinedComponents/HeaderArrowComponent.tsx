import React from 'react';
import {theme} from "../../styles/theme";
import Arrow from "../../assets/icons/arrow_down.svg";
import {Block} from "../SimpleComponents";

const HeaderArrowComponent = () => {
    return (
        <Block
            width={'100%'}
            height={'52px'}
            mt={'32px'}
            borderRadius={20}
            padding={[0,'12px 0px 12px 30.5px','12px 0px 12px 30.5px']}
            alignItems={'center'}
            backgroundColor={['transparent',theme.colors.colorSecBg, theme.colors.colorSecBg]}
        >
            <img src={Arrow} alt="play" style={{
                width: "28px",
                height: "26px"
            }}/>
        </Block>
    );
};

export default HeaderArrowComponent;
