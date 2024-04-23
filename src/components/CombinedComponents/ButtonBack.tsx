import React from 'react';
import {Block, Button} from "../SimpleComponents";
import back from "../../assets/icons/arrow-back.svg";
import {useNavigate} from "react-router-dom";

const ButtonBack = () => {
    const navigate = useNavigate();
    return (
        <Block
            width={"100%"}
        >
            <Button onClick={() => navigate(-1)}>
                <img src={back} alt="back" style={{width: "20px", height: "20px"}}/>
            </Button>
        </Block>
    );
};

export default ButtonBack;
