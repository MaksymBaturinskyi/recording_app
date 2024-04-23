import React, {useCallback, useEffect, useRef, useState} from "react";
import {Block, Button, Text} from "../../components/SimpleComponents";
import {Container} from "../../components/SimpleComponents/Container";
import {useLocation, useNavigate} from "react-router-dom";
import play from "../../assets/icons/play_white.svg";
import HeaderArrowComponent from "../../components/CombinedComponents/HeaderArrowComponent";
import {theme} from "../../styles/theme";
import Mic from "../../assets/icons/mic.svg";
import Footer from "../../components/CombinedComponents/Footer";
import {useRecording} from "../../helpers/useRecording";
import Stop from "../../assets/icons/Stop";
import ButtonBack from "../../components/CombinedComponents/ButtonBack";
import TextTitle from "../../components/CombinedComponents/TextTitle";
import {handleFormatTime} from "../../helpers/handleFormatTime";
import TextMicPermissions from "../../components/CombinedComponents/TextMicPermissions";
import {MainContainer} from "../../components/SimpleComponents/MainContainer";

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
        recordingTime,
        recordingDuration,
        permissionDenied
    } = useRecording({ initialTrackUrl });

    const handleReRecording = () => {
        if (permissionDenied) {
            setShowModal(true)
        } else {
            if(!isNewRecording || !isRecording) {
                clearRecording();
                startRecording();
                setIsNewRecording(true);
            } else {
                stopRecording();
            }

        }
    };

    // const handleSaveAndNext = () => {
    //     stopRecording();
    // };

    const updateTime = useCallback(() => {
        if (audioRef.current) {
            setCurrentTime(handleFormatTime(audioRef.current.currentTime));
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
                if (audioSrc && (!audioRef.current || audioRef.current.src !== audioSrc)) {
                    audioRef.current = new Audio(audioSrc);
                    audioRef.current.addEventListener('timeupdate', updateTime);
                    audioRef.current.addEventListener('ended', handleEnd);
                }

                if (audioRef.current) {
                    audioRef.current.play().catch(error => console.error("Error playing the file:", error));
                    setSampleActive(true);
                }
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

    const formattedDuration = formatTime(isNewRecording ? recordingDuration : duration);

    return (
        <MainContainer>
            <Container
                flexDirection={"column"}
                alignItems={"center"}
                width={"100%"}
                // minHeight={"100vh"}
            >
                <HeaderArrowComponent />

                <Block
                    justifyContent={'space-between'}
                    flexDirection={['column', 'row', 'row']}
                    width={"100%"}
                    maxWidth={'830px'}
                    mt={['20px', '20px', '50px']}
                    // paddingTop={[0,0,105]}
                    // paddingBottom={[0,0,105]}
                >
                    <Block mr={['0px','60px','60px']} width={'100%'} flexDirection={'column'}>
                        <ButtonBack />
                        <TextTitle title={'Well done!'}/>

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
                        <TextTitle title={'Not happy? Re-record your question'} mt={['30px','0px','0px']} />
                        <Button
                            width="100%"
                            height="59px"
                            mt={'30px'}
                            borderRadius={14}
                            borderWidth={0}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            onClick={handleReRecording}
                            backgroundColor={ isRecording ? theme.colors.colorPrimary : theme.colors.colorSecondaryRed}
                            boxShadow="4.95px 4.95px 9.9px 0 rgba(0, 0, 0, 0.2)"
                        >
                            {isRecording ?
                                <>
                                    <Text
                                        fontFamily={theme.fontFamily.inter}
                                        fontWeight={700}
                                        fontSize={20}
                                        marginRight={3}
                                        color={theme.colors.colorWhite}
                                    >
                                        {handleFormatTime(recordingTime)}
                                    </Text>
                                    <Stop color={theme.colors.colorWhite} width={'30px'} height={'30px'}/>
                                </>
                                :
                                <>
                                    <Text
                                        fontFamily={theme.fontFamily.inter}
                                        fontWeight={700}
                                        fontSize={20}
                                        marginRight={3}
                                        color={theme.colors.colorWhite}
                                    >
                                        Record again
                                    </Text>
                                    <img src={Mic} alt="mic" style={{width: "30px", height: "30px"}}/>
                                </>
                            }
                        </Button>

                        {showModal && <TextMicPermissions top={'170px'} />}

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
        </MainContainer>
    );
};

export default QuestionCreate;
