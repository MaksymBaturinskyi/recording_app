import React from "react";
import {Block, Button, Text} from "../components/SimpleComponents";
import {Container} from "../components/SimpleComponents/Container";
import {useNavigate} from "react-router-dom";


const stepsListData = [
    "1. Record a question",
    "2. Invite your relatives to answer",
    "3. We'll store it in your family history vault forever",
]

const QuestionCreate: React.FC = () => {
    const navigate = useNavigate()

    return (
        <Container
            pt={5}
            flexDirection={"column"}
            // justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            minHeight={"100vh"}
            maxWidth={"640px"}
        >

            <Text
                fontWeight={"bold"}
                fontSize={4}
                width={"100%"}
            >
                Start building your family history vault.
            </Text>
            <Text
                mt={3}
                fontSize={3}
                fontStyle={"italic"}
                width={"100%"}
            >
                Question by questions
            </Text>

            <Block
                mt={3}
                flexDirection={"column"}
                width={"100%"}
            >
                {
                    stepsListData.map((step: string, index: number) => {
                        return (
                            <Block
                                marginTop={3}
                                key={index}
                            >
                                <Text
                                    fontWeight={"bold"}
                                    fontSize={2}
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
            <Text
                marginTop={4}
                fontWeight={"bold"}
                fontSize={3}
                width={"100%"}
            >
                Ask a question you want answered
            </Text>

            <Block
                justifyContent={"center"}
                width={"100%"}
                mt={4}
            >
                <Button
                    width={"100%"}
                    maxWidth={"300px"}
                    px={4}
                    py={3}
                    backgroundColor={"#42b72a"}
                    borderRadius={8}
                    borderWidth={0}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    onClick={() => {
                        navigate('/questioncreate')
                    }}
                >
                    <Text
                        fontWeight={"bold"}
                        fontSize={2}
                    >
                        Record
                    </Text>
                    <Block
                        ml={2}
                        borderRadius={"50%"}
                        width={"20px"}
                        height={"20px"}
                        backgroundColor={"red"}
                    />
                </Button>
            </Block>
        </Container>

    );
};

export default QuestionCreate;
