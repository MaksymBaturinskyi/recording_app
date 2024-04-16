import React, {useEffect, useRef, useState} from "react";
import {Block, Button, Text} from "../components/SimpleComponents";
import {Container} from "../components/SimpleComponents/Container";
import {useLocation, useNavigate} from "react-router-dom";
import play from "../assets/icons/play_white.svg";
import back from "../assets/icons/arrow-back.svg";
import HeaderArrowComponent from "../components/CombinedComponents/HeaderArrowComponent";
import {theme} from "../styles/theme";
import Mic from "../assets/icons/mic.svg";
import Footer from "../components/CombinedComponents/Footer";
import {useRecording} from "../helpers/useRecording";
import sampleMp3 from "../assets/sounds/sample.mp3";
import Stop from "../assets/icons/Stop";
import Play from "../assets/icons/play.svg";

const QuestionCreate: React.FC = () => {
    const [sampleActive, setSampleActive] = useState<boolean>(false);
    const location = useLocation();
    const { recordingDuration: duration } = location.state || {};
    const [currentTime, setCurrentTime] = useState('00:00');
    const navigate = useNavigate();
    const initialTrackUrl = location.state?.trackUrl;

    const {
        isRecording,
        trackUrl: newTrackUrl,
        startRecording,
        stopRecording,
        clearRecording,
        recordingDuration
    } = useRecording({ initialTrackUrl });

    const handleReRecording = () => {
        clearRecording();
        startRecording();
    };

    const handleSaveAndNext = () => {
        stopRecording();
    };

    const handlePlaySample = () => {
        if (sampleActive) {
            setSampleActive(false);
        } else {
            const audioSrc = newTrackUrl;
            if (audioSrc) {
                const audio = new Audio();
                audio.src = newTrackUrl;

                setCurrentTime(formatTime(0));

                const updateTime = () => {
                    setCurrentTime(formatTime(audio.currentTime));
                };

                audio.addEventListener('timeupdate', updateTime);
                audio.addEventListener('ended', () => {
                    setSampleActive(false);
                    audio.removeEventListener('timeupdate', updateTime);
                });

                audio.play().catch(error => console.error("Error playing the file:", error));
                setSampleActive(true);
            }
        }
    };


    useEffect(() => {
        if (!initialTrackUrl) {
            setSampleActive(false);
        }
    }, [initialTrackUrl]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    console.log('duration', duration);
    console.log('recDuration', recordingDuration);

    const formattedDuration = formatTime(duration < recordingDuration ? recordingDuration : duration);

    return (
        <>
            <Container
                pt={5}
                flexDirection={"column"}
                alignItems={"center"}
                width={"100%"}
                minHeight={"100vh"}
            >
                <HeaderArrowComponent />

                <Block
                    justifyContent={'space-between'}
                    flexDirection={['column', 'row', 'row']}
                    width={"100%"}
                    maxWidth={'830px'}
                    mt={['20px', '20px', '132px']}
                    paddingTop={[0,0,105]}
                    paddingBottom={[0,0,105]}
                >
                    <Block mr={['0px','60px','60px']} width={'100%'} flexDirection={'column'}>
                        <Block
                            display={['none','block','block']}
                            width={"100%"}
                        >
                            <Button onClick={() => navigate(-1)}>
                                <img src={back} alt="back" style={{width: "20px", height: "20px"}}/>
                            </Button>
                        </Block>
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
                            mt={['30px','48px','48px']}
                            borderRadius={14}
                            backgroundColor={theme.colors.colorBgGray}
                            boxShadow="4.95px 4.95px 9.9px 0 rgba(0, 0, 0, 0.2)"
                            onClick={handlePlaySample}
                        >
                            <Text
                                color={theme.colors.colorWhite}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={700}
                                fontSize={20}
                                marginRight={'20px'}
                            >
                                {sampleActive ? `${currentTime} / ${formattedDuration}` :
                                    'Listen to your question'
                                }
                            </Text>
                            {sampleActive
                                ? <Stop width={'40px'} height={'40px'} color={theme.colors.colorWhite}/>
                                : <img src={play} alt="play" style={{width: '20px', height: '20px', color: `${theme.colors.colorWhite}`}}/>
                            }
                        </Button>
                    </Block>
                    <Block width={'100%'} flexDirection={'column'}>
                        <Text
                            mt={['30px','0px','0px']}
                            fontFamily={theme.fontFamily.ebgaramond}
                            fontWeight={700}
                            fontSize={[32,32,33]}
                            lineHeight={theme.lineHeights.title}
                            width={"100%"}
                        >
                            Not happy?<br/>Re-record your question
                        </Text>
                        <Button
                            width="100%"
                            height="59px"
                            mt={'30px'}
                            borderRadius={14}
                            borderWidth={0}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            onClick={isRecording ? handleSaveAndNext : handleReRecording}
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
            <Footer />
        </>
    );
};

export default QuestionCreate;
