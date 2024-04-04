import React, {useEffect, useRef, useState} from "react";
import {Block, Button, Text} from "../components/SimpleComponents";
import {LiveAudioVisualizer} from 'react-audio-visualize';
import {useAudioRecorder} from 'react-audio-voice-recorder';
import {Container} from "../components/SimpleComponents/Container";
import {useNavigate, useNavigation} from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import play from "../assets/images/play.png";


const stepsListData = [
    "1. Record a question",
    "2. Invite them to answer",
    "3. We'll store it in your family history vault forever",
]

const QuestionCreate: React.FC = () => {
    const [second, setSecond] = useState<string>("00");
    const [minute, setMinute] = useState<string>("00");
    const [isActive, setIsActive] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [trackUrl, setTrackUrl] = useState<string>("");
    const [waitForSend, setWaitForSend] = useState<boolean>(false);
    const [selectedTrackUrl, setSelectedTrackUrl] = useState<string | null>(null);
    const recorder = useAudioRecorder();
    const navigate = useNavigate()

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond =
                    String(secondCounter).length === 1
                        ? `0${secondCounter}`
                        : String(secondCounter);
                const computedMinute =
                    String(minuteCounter).length === 1
                        ? `0${minuteCounter}`
                        : String(minuteCounter);

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter((counter) => counter + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);

    function stopTimer(): void {
        setIsActive(false);
        setCounter(0);
        setSecond("00");
        setMinute("00");
    }


    useEffect(() => {
        if (recorder.recordingBlob) {
            const url = URL.createObjectURL(recorder.recordingBlob);
            setTrackUrl(url);
        }
    }, [recorder.recordingBlob]);

    useEffect(() => {
        if (trackUrl && waitForSend) {
            navigate("/share")

        }
    }, [trackUrl, waitForSend]);

    const handleRecordingSwitch = () => {
        setTrackUrl("")
        if (!recorder.isRecording) {
            recorder.startRecording();
        } else {
            recorder.stopRecording();
            stopTimer();
            setIsActive(false);
        }

        setIsActive(!isActive);
    }

    const handleSendPrepare = () => {
        if (recorder.isRecording) {
            handleRecordingSwitch()
        }
        setWaitForSend(true)
    }

    const handleRecordingStart = () => {
        handleRecordingSwitch()
        setTrackUrl("")
        setWaitForSend(false)
    }

    return (
        <Container
            pt={5}
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
                mt={3}
                fontWeight={"bold"}
                fontSize={4}
                width={"100%"}
                textDecoration={"underline"}

            >
                Ask your first question
            </Text>

            <Block
                mt={3}
                width={"100%"}
                justifyContent={"center"}

            >
                <Button
                    height={"150px"}
                    width={"70px"}
                    borderRadius={"70px"}
                    boxShadow={"inset 2px 0 7px grey"}
                    border={"1px solid lightGrey"}
                    position={"relative"}
                    onClick={handleRecordingStart}
                    // disabled={recorder.isPaused}
                >
                    <Block
                        width={"50px"}
                        height={"50px"}
                        borderRadius={"50px"}
                        backgroundColor={recorder.isRecording ? "darkRed" : "white"}
                        opacity={recorder.isPaused ? 0.5 : 1}
                        position={"absolute"}
                        top={recorder.isRecording  ? "10px" : "calc(100% - 60px)"}
                        left={"50%"}
                        transform={"translateX(-50%)"}
                        boxShadow={"0 0 10px grey"}
                    />

                    <Block
                        position={"absolute"}
                        left={"calc(100% + 20px)"}
                        top={"22px"}
                    >
                        <Text
                            fontSize={3}
                            fontWeight={"bold"}
                        >
                            {`${minute}:${second}`}
                        </Text>
                    </Block>


                    {
                        recorder.isRecording &&
                        <Button
                            position={"absolute"}
                            width={"100%"}
                            left={"calc(100% + 20px)"}
                            bottom={"22px"}
                            onClick={(e) => {
                                e.stopPropagation()
                                recorder.togglePauseResume();
                                setIsActive(!isActive)
                            }}
                        >
                            <Text
                                fontSize={3}
                            >
                                {!recorder.isPaused ? "Pause" : "Record"}
                            </Text>
                        </Button>
                    }

                </Button>


            </Block>
            <Text
                marginTop={4}
                fontWeight={"bold"}
                fontSize={5}
                width={"100%"}
            >
                Ask a question you
                want answered
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
                    backgroundColor={recorder.isRecording || trackUrl ? "#42b72a" : "lightGrey"}
                    borderRadius={8}
                    borderWidth={0}
                    ml={2}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    onClick={handleSendPrepare}
                >
                    <Text
                        fontWeight={"bold"}
                        fontSize={2}
                        color={trackUrl ? "white" : "black"}
                    >
                        Send
                    </Text>
                </Button>
            </Block>

            {recorder.mediaRecorder && (
                <LiveAudioVisualizer
                    mediaRecorder={recorder.mediaRecorder}
                    width={200}
                    height={75}
                />
            )}

            {
                trackUrl &&
                <Block
                    width={"100%"}
                    justifyContent={"center"}
                    mt={'auto'}
                    mb={5}
                >
                    <Button
                        width={"50px"}
                        height={"50px"}
                        borderRadius={"50px"}
                        backgroundColor={recorder.isRecording && !recorder.isPaused ? "darkRed" : "white"}
                        // position={"absolute"}
                        // top={recorder.isRecording && !recorder.isPaused ? "10px" : "calc(100% - 60px)"}
                        // left={"50%"}
                        // transform={"translateX(-50%)"}
                        boxShadow={"0 0 10px grey"}
                        onClick={() => {
                            const audioToPlay = new Audio(trackUrl);
                            audioToPlay.play();
                        }}
                    >
                        <img src={play} alt="play" style={{width: "20px", height: "20px"}}/>
                    </Button>
                </Block>
            }

        </Container>

    );
};

export default QuestionCreate;
