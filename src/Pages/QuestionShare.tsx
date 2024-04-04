import React, {useEffect, useState} from "react";
import {Block, Button, SimpleInput, Text} from "../components/SimpleComponents";
import {LiveAudioVisualizer} from 'react-audio-visualize';
import {useAudioRecorder} from 'react-audio-voice-recorder';
import {Container} from "../components/SimpleComponents/Container";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface ReactMediaRecorderHookProps {
    startRecording: () => void;
    stopRecording: () => void;
    pauseRecording: () => void;
    mediaBlobUrl?: string | null;

}

const QuestionShare: React.FC = () => {
    const [phoneValue, setPhoneValue] = useState<string>("");


    return (
        <Container
            paddingTop={4}
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
                textDecoration={"underline"}
            >
                Start building your family
                history vault question by
                questions.
            </Text>

            <Text
                marginTop={6}
                fontWeight={"bold"}
                fontSize={5}
                width={"100%"}
            >
                Now lets get your loved
                one to answer
            </Text>

            <Block
                height={"20px"}
                width={"100%"}
                borderRadius={"70px"}
                boxShadow={"inset 2px 0 7px grey"}
                border={"1px solid lightGrey"}
                position={"relative"}

            >

                <PhoneInput
                    country="US"
                    placeholder="Enter phone number"
                    value={phoneValue}
                    //@ts-ignore
                    onChange={setPhoneValue}/>
            </Block>


        </Container>
    );
};

export default QuestionShare;
