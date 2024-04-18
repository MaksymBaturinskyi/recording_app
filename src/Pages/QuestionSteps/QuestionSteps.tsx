import React, {useEffect, useState} from "react";
import {Block, Button, Text} from "../../components/SimpleComponents";
import {Container} from "../../components/SimpleComponents/Container";
import {useNavigate} from "react-router-dom";
import {theme} from "../../styles/theme";
import Stop from "../../assets/icons/Stop";
import Mic from "../../assets/icons/mic.svg";
import Footer from "../../components/CombinedComponents/Footer";
import HeaderArrowComponent from "../../components/CombinedComponents/HeaderArrowComponent";
import {useRecording} from "../../helpers/useRecording";
import TextTitle from "../../components/CombinedComponents/TextTitle";
import AudioSampleBlock from "./components/AudioSampleBlock";
import StepList from "./components/StepList";
import {handleFormatTime} from "../../helpers/handleFormatTime";
import TextMicPermissions from "../../components/CombinedComponents/TextMicPermissions";

const QuestionSteps: React.FC = () => {
    const navigate = useNavigate();
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
                        <StepList />
                    </Block>
                    <Block flexDirection={'column'} position={'relative'}>
                        <AudioSampleBlock />
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
                                        Record
                                    </Text>
                                    <img src={Mic} alt="mic" style={{width: "30px", height: "30px"}}/>
                                </>
                            }
                        </Button>}
                        {showModal && <TextMicPermissions bottom={'-40px'} />}
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

export default QuestionSteps;
