import React, {useEffect, useState} from "react";
import {Block, Button, SimpleInput, Text} from "../components/SimpleComponents";
import {LiveAudioVisualizer} from 'react-audio-visualize';
import {useAudioRecorder} from 'react-audio-voice-recorder';
import {Container} from "../components/SimpleComponents/Container";
import {useNavigate} from "react-router-dom";

const formFields = [
    {
        placeholder: "Enter email address",
        label: "Email",
        type: "email",
        fieldKey: "email"
    },
    {
        placeholder: "Enter your password",
        label: "Password",
        type: "password",
        fieldKey: "password"

    }
]

interface loginFormInterface {
    email?: string;
    password?: string;
    isValid?: boolean;
    error?: {
        email?: string;
        password?: string;
    };
}

const AccountCreate: React.FC = () => {
    const navigate = useNavigate()

    const [formValue, setFormValue] = useState<loginFormInterface>({});

    const handleFormEvent = (fieldKey: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [fieldKey]: e.target.value
        })
    }
    console.log("formValue");
    console.log(formValue);

    const handleSubmit = () => {
        // navigate('/accountcreate')
    }
    return (
        <Container
            flexDirection={"column"}
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

            <Block
                justifyContent={"center"}
                maxWidth={"640px"}
                flexDirection={"column"}
                alignSelf={"center"}
                width={"100%"}
            >
                <Text
                    mt={5}
                    fontWeight={"bold"}
                    fontSize={2}
                    width={"100%"}

                >Sign up</Text>
                {formFields.map((field) => {
                    return (
                        <Block
                            mt={3}
                            width={"100%"}
                            borderRadius={"30px"}
                            boxShadow={"inset 2px 0 7px grey"}
                            border={"1px solid lightGrey"}
                            position={"relative"}
                            flexWrap={"wrap"}
                            key={field.fieldKey}
                            px={4}
                            py={2}
                        >
                            <Text
                                color={"grey"}
                                fontSize={2}
                            >
                                {field.label}
                            </Text>
                            <SimpleInput
                                width={"100%"}
                                fontSize={"18px"}
                                placeholder={field.placeholder}
                                border={0}
                                onChange={handleFormEvent(field.fieldKey)}
                            />
                        </Block>
                    )
                })}
                <Button
                    width={"100%"}
                    maxWidth={"300px"}
                    mt={4}
                    px={4}
                    py={3}
                    backgroundColor={formValue.isValid ? "#42b72a" : "lightGrey"}
                    disabled={!formValue.isValid}
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
            </Block>



        </Container>
    );
};

export default AccountCreate;
