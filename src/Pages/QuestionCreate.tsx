import React, {useCallback, useEffect, useRef, useState} from "react";
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
    const [isNewRecording, setIsNewRecording] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const audioRef = useRef<HTMLAudioElement | null>(null);


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
        recordingDuration,
        permissionDenied
    } = useRecording({ initialTrackUrl });

    const handleReRecording = () => {
        if (permissionDenied) {
            setShowModal(true)
        } else {
            clearRecording();
            startRecording();
            setIsNewRecording(true);
        }
    };

    const handleSaveAndNext = () => {
        stopRecording();
    };

    const updateTime = useCallback(() => {
        if (audioRef.current) {
            setCurrentTime(formatTime(audioRef.current.currentTime));
        }
    }, []);

    const handleEnd = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        setSampleActive(false);
    }, []);
    const handlePlaySample = () => {
        if (sampleActive) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            setSampleActive(false);
        } else {
            const audioSrc = isNewRecording ? newTrackUrl : initialTrackUrl;
            if (audioSrc) {
                if (!audioRef.current) {
                    audioRef.current = new Audio(audioSrc);
                    audioRef.current.addEventListener('timeupdate', updateTime);
                    audioRef.current.addEventListener('ended', handleEnd);
                } else {
                    audioRef.current.src = audioSrc;
                    audioRef.current.currentTime = 0;
                }

                audioRef.current.play().catch(error => console.error("Error playing the file:", error));
                setSampleActive(true);
            }
        }
    };

    useEffect(() => {
        setShowModal(permissionDenied);
    }, [permissionDenied]);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('timeupdate', updateTime);
                audioRef.current.removeEventListener('ended', handleEnd);
                audioRef.current = null;
            }
        };
    }, [updateTime, handleEnd]);

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

    const formattedDuration = formatTime(isNewRecording ? recordingDuration : duration);

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
                    <Block width={'100%'} flexDirection={'column'} position={'relative'}>
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

                        {showModal && (
                            <Text
                                position={'absolute'}
                                top={'180px'}
                                mt={'10px'}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={400}
                                fontSize={14}
                                color={theme.colors.colorSecondaryRed}
                            >
                                Please go to settings and allow mic permissions.
                            </Text>
                        )}

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
