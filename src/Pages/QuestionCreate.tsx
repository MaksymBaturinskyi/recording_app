import React, {useEffect, useState} from "react";
import {Block, Button, Text} from "../components/SimpleComponents";
import {useAudioRecorder} from 'react-audio-voice-recorder';
import {Container} from "../components/SimpleComponents/Container";
import {useLocation, useNavigate} from "react-router-dom";
import play from "../assets/icons/play_white.svg";
import HeaderArrowComponent from "../components/CombinedComponents/HeaderArrowComponent";
import {theme} from "../styles/theme";
import Mic from "../assets/icons/mic.svg";

const QuestionCreate: React.FC = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [newTrackUrl, setNewTrackUrl] = useState<string>("");
    const location = useLocation();
    const trackUrl = location.state?.trackUrl;
    const recorder = useAudioRecorder();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (trackUrl && waitForSend) {
    //         navigate("/share")
    //
    //     }
    // }, [trackUrl, waitForSend]);

    const handleRecording = () => {
        if (!isRecording) {
            recorder.startRecording();
            setIsRecording(true);
        } else {
            setNewTrackUrl("");
            recorder.stopRecording();
            setIsRecording(false);
        }
    };

    useEffect(() => {
        if (recorder.recordingBlob) {
            const newUrl = URL.createObjectURL(recorder.recordingBlob);
            setNewTrackUrl(newUrl);
        }
    }, [recorder.recordingBlob]);

    return (
        <Container
            pt={5}
            flexDirection={"column"}
            alignItems={"center"}
            width={"100%"}
            minHeight={"100vh"}
        >
            <HeaderArrowComponent />

            <Block
                display={['none','block','block']}
                mt={3}
                width={"100%"}
            >
                <Button onClick={() => navigate(-1)}>Back</Button>
            </Block>

            <Block
                justifyContent={'center'}
                flexDirection={['column', 'column', 'row']}
                width={"100%"}
                maxWidth={'830px'}
                mt={['20px', '20px', '132px']}
                paddingTop={[0,0,105]}
                paddingBottom={[0,0,105]}
            >
                <Block flexDirection={'column'}>
                    <Text
                        fontFamily={theme.fontFamily.ebgaramond}
                        fontWeight={700}
                        fontSize={[32,32,33]}
                        lineHeight={theme.lineHeights.title}
                        width={"100%"}
                    >
                        Well done!
                    </Text>

                    <Button
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={"100%"}
                        height={"59px"}
                        mt={'30px'}
                        borderRadius={14}
                        backgroundColor={theme.colors.colorBgGray}
                        boxShadow="4.95px 4.95px 9.9px 0 rgba(0, 0, 0, 0.2)"
                        onClick={() => {
                            const audioSrc = newTrackUrl || trackUrl;
                            if (audioSrc) {
                                const audioToPlay = new Audio(audioSrc);
                                audioToPlay.play();
                            }
                        }}
                    >
                        <Text
                            color={theme.colors.colorWhite}
                            fontFamily={theme.fontFamily.inter}
                            fontWeight={700}
                            fontSize={20}
                            marginRight={3}
                        >
                            Listen to your question
                        </Text>
                        <img src={play} alt="play" style={{width: "20px", height: "20px", color: 'white'}}/>
                    </Button>
                    <Text
                        mt={'30px'}
                        fontFamily={theme.fontFamily.ebgaramond}
                        fontWeight={700}
                        fontSize={[32,32,33]}
                        lineHeight={theme.lineHeights.title}
                        width={"100%"}
                    >
                        Not happy?<br/>Re-record your question
                    </Text>
                </Block>
                <Block flexDirection={'column'}>
                    <Button
                        width="100%"
                        height="59px"
                        mt={'20px'}
                        borderRadius={14}
                        borderWidth={0}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        onClick={handleRecording}
                        backgroundColor={ isRecording ? theme.colors.colorPrimary : theme.colors.colorSecondaryRed}
                        boxShadow="4.95px 4.95px 9.9px 0 rgba(0, 0, 0, 0.2)"
                    >
                        <Text
                            fontFamily={theme.fontFamily.inter}
                            fontWeight={700}
                            fontSize={20}
                            marginRight={3}
                            color={theme.colors.colorWhite}
                        >
                            {isRecording ? 'Save and Next' : 'Record again'}
                        </Text>
                        {isRecording
                            ? <Block width={'20px'} height={'20px'} borderRadius={'20px'} backgroundColor={theme.colors.colorSecondaryRed}></Block>
                            : <img src={Mic} alt="mic" style={{width: "30px", height: "30px"}}/>
                        }
                    </Button>
                    <Button
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={"100%"}
                        height={"59px"}
                        mt={'140px'}
                        borderRadius={14}
                        backgroundColor={theme.colors.colorPrimary}
                        boxShadow="4.95px 4.95px 9.9px 0 rgba(0, 0, 0, 0.2)"
                        onClick={() => {
                            navigate("/share")
                        }}
                    >
                        <Text
                            color={theme.colors.colorWhite}
                            fontFamily={theme.fontFamily.inter}
                            fontWeight={700}
                            fontSize={20}
                            marginRight={3}
                        >
                            Invite family to answer
                        </Text>
                    </Button>
                </Block>
            </Block>
        </Container>

    );
};

export default QuestionCreate;
