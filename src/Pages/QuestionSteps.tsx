import React, {useEffect, useState} from "react";
import {Block, Button, Text} from "../components/SimpleComponents";
import {Container} from "../components/SimpleComponents/Container";
import {useNavigate} from "react-router-dom";
import {theme} from "../styles/theme";
import Play from "../assets/icons/play.svg";
import Stop from "../assets/icons/Stop";
import Mic from "../assets/icons/mic.svg";
import Footer from "../components/CombinedComponents/Footer";
import HeaderArrowComponent from "../components/CombinedComponents/HeaderArrowComponent";
import {useRecording} from "../helpers/useRecording";
import sampleMp3 from '../assets/sounds/sample.mp3';
import TextTitle from "../components/CombinedComponents/TextTitle";

const stepsListData = [
    "1. Record a question",
    "2. Invite your relatives to answer",
    "3. We'll store it in your family history vault forever",
]

const QuestionCreate: React.FC = () => {
    const navigate = useNavigate();
    const [sampleActive, setSampleActive] = useState<boolean>(false);
    const {
        isRecording,
        trackUrl,
        recordingTime,
        permissionDenied,
        startRecording,
        stopRecording,
        recordingDuration
    } = useRecording({ initialTrackUrl: '' });
    const [showModal, setShowModal] = useState(false);
    const [hasFinishedRecording, setHasFinishedRecording] = useState<boolean>(false);

    useEffect(() => {
        setShowModal(permissionDenied);
    }, [permissionDenied]);

    const handleRecording = () => {
        if (permissionDenied) {
            setShowModal(true);
        } else {
            if (!isRecording && !showModal) {
                startRecording();
                setHasFinishedRecording(false);
            } else {
                stopRecording();
                setHasFinishedRecording(true);
            }
        }
    };

    const formatTime = (time: string | number) => {
        const pad = (num: number | string) => num.toString().padStart(2, '0');
        return `00:${pad(time)}`;
    };

    const handlePlaySample = () => {
        if (sampleActive) {
            setSampleActive(false);
        } else {
            const audio = new Audio(sampleMp3);
            setSampleActive(true);

            audio.play().catch(error => console.error("Error playing the file:", error));

            audio.addEventListener('ended', () => {
                setSampleActive(false);
            }, { once: true });
        }
    };

    const handleSaveAndNext = () => {
        if (hasFinishedRecording && trackUrl) {
            navigate('/questioncreate', { state: { trackUrl, recordingDuration } });
        }
    };

    return (
        <>
            <Container
                pt={5}
                flexDirection={"column"}
                alignItems={"center"}
                width={"100%"}
                minHeight={'100vh'}
            >
                <HeaderArrowComponent />

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
                        <TextTitle title={'Start building your family history vault.'} />
                        <Text
                            mt={20}
                            fontSize={28}
                            fontStyle={"italic"}
                            fontWeight={400}
                            fontFamily={theme.fontFamily.ebgaramond}
                            width={"100%"}
                        >
                            Question by questions
                        </Text>

                        <Block
                            mt={40}
                            flexDirection={"column"}
                            width={"100%"}
                        >
                            {
                                stepsListData.map((step: string, index: number) => {
                                    return (
                                        <Block
                                            key={index}
                                        >
                                            <Text
                                                fontWeight={400}
                                                fontSize={18}
                                                color={theme.colors.colorTextGray}
                                                fontFamily={theme.fontFamily.inter}
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
                    </Block>
                    <Block flexDirection={'column'}>
                        <Button
                            display={'flex'}
                            onClick={handlePlaySample}
                            mt={40}
                            width={'100%'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            height={'52px'}
                        >
                            <Block
                                width={'40px'}
                                height={'40px'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                borderRadius={'50px'}
                                border={`1px solid ${theme.colors.colorTextGray}`}
                                marginRight={'16px'}
                            >
                                {sampleActive
                                    ? <Stop width={'30px'} height={'30px'} color={'#777777'}/>
                                    : <img src={Play} alt="play"/>
                                }
                            </Block>

                            <Text
                                textAlign={'start'}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={400}
                                fontSize={18}
                                color={theme.colors.colorTextGray}
                            >
                                Listen to a sample question
                            </Text>
                        </Button>
                        <Text
                            marginTop={40}
                            fontWeight={700}
                            fontFamily={theme.fontFamily.inter}
                            fontSize={18}
                            width={"100%"}
                        >
                            Ask a question you want answered
                        </Text>

                        {!hasFinishedRecording && <Button
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
                            {isRecording
                                ? <>
                                    <Text
                                        fontFamily={theme.fontFamily.inter}
                                        fontWeight={700}
                                        fontSize={20}
                                        marginRight={3}
                                        color={theme.colors.colorWhite}
                                    >
                                        {formatTime(recordingTime)}
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
                                        Record
                                    </Text>
                                    <img src={Mic} alt="mic" style={{width: "30px", height: "30px"}}/>
                                </>
                            }
                        </Button>}
                        {showModal && (
                            <Text
                                mt={'10px'}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={400}
                                fontSize={14}
                                color={theme.colors.colorSecondaryRed}
                            >
                                Please go to settings and allow mic permissions.
                            </Text>
                        )}
                        {hasFinishedRecording &&
                            <Button
                                width="100%"
                                height="59px"
                                mt={'20px'}
                                borderRadius={14}
                                borderWidth={0}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                backgroundColor={theme.colors.colorPrimary}
                                boxShadow="4.95px 4.95px 9.9px 0 rgba(0, 0, 0, 0.2)"
                                onClick={handleSaveAndNext}
                            >
                                <Text
                                    fontFamily={theme.fontFamily.inter}
                                    fontWeight={700}
                                    fontSize={20}
                                    marginRight={3}
                                    color={theme.colors.colorWhite}
                                >
                                    Save & Next
                                </Text>
                            </Button>
                        }
                    </Block>
                </Block>
            </Container>
            <Footer />
        </>
    );
};

export default QuestionCreate;
