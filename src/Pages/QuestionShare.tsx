import React, {useState} from "react";
import {Block, Button, SimpleInput, Text} from "../components/SimpleComponents";
import {Container} from "../components/SimpleComponents/Container";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import '../App.css'
import {useNavigate} from "react-router-dom";

const QuestionShare: React.FC = () => {
    const [shareValue, setShareValue] = useState<string>("");
    const [shareType, setShareType] = useState<string>("sms");
    const navigate = useNavigate()

    const changeShareType = (value: string) => () =>{
        setShareValue("")
        setShareType(value)
    }

    const handleSubmit = () => {
        navigate('/accountcreate')
    }

    const handleCopyUrl = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
    }

    return (
        <Container
            paddingTop={4}
            flexDirection={"column"}
            alignItems={"center"}
            width={"100%"}
            minHeight={"100vh"}
            maxWidth={"640px"}
        >
            <Block
                mt={3}
                width={"100%"}
            >
                <Button onClick={() => navigate(-1)}>Back</Button>
            </Block>
            <Text
                mt={5}
                fontWeight={"bold"}
                fontSize={4}
                width={"100%"}

            >
                Now lets get your loved
                one to answer
            </Text>
            <Text
                mt={5}
                fontWeight={"bold"}
                fontSize={2}
                width={"100%"}

            >
                Share question via
            </Text>

            <Block
                mt={3}
                width={"100%"}
            >
                <Button
                    onClick={changeShareType("sms")}
                >
                    <Text
                        fontSize={2}
                        color={shareType === "sms" ? "green" : "grey"}
                        textDecoration={shareType === "sms" ? "underline" : "none"}
                    >SMS</Text>
                </Button>
                <Button
                    ml={2}
                    color={shareType === "sms" ? "green" : "grey"}
                    onClick={changeShareType("email")}
                >
                    <Text
                        ml={2}
                        color={shareType !== "sms" ? "green" : "grey"}
                        textDecoration={shareType !== "sms" ? "underline" : "none"}

                    >Email</Text>
                </Button>
            </Block>

            <Block
                mt={3}
                width={"100%"}
                borderRadius={"70px"}
                boxShadow={"inset 2px 0 7px grey"}
                border={"1px solid lightGrey"}
                position={"relative"}
            >
                {
                    shareType === "sms" ? (
                        <PhoneInput
                            country="US"
                            placeholder="Enter phone number"
                            value={shareValue}
                            //@ts-ignore
                            onChange={(val)=>{
                                if (val){
                                    setShareValue(val)
                                }
                            }}
                            style={{
                                padding: "10px",
                                width: "100%",
                                fontSize: "24px",
                            }}
                        />
                    )
                        : <SimpleInput
                            width={"100%"}
                            padding={3}
                            fontSize={"18px"}
                            borderRadius={"100px"}
                            onChange={(e) => {
                                setShareValue(e.target.value)
                            }}
                        />

                }
            </Block>
            <Button
                width={"100%"}
                maxWidth={"300px"}
                mt={4}
                px={4}
                py={3}
                backgroundColor={shareValue.length ? "#42b72a" : "lightGrey"}
                disabled={shareValue.length === 0}
                borderRadius={8}
                borderWidth={0}
                ml={2}
                color={"white"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={handleSubmit}
            >
                <Text
                    fontWeight={"bold"}
                    fontSize={2}
                    color={"white"}
                >
                    Invite them to answer
                </Text>
            </Button>

            <Button
                mt={3}
                onClick={handleCopyUrl}
            >
                @ Copv URL to share
            </Button>
        </Container>
    );
};

export default QuestionShare;
