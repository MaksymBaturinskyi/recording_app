import React, {useEffect} from "react";
import {Block, Button, Text} from "../components/SimpleComponents";
import {Container} from "../components/SimpleComponents/Container";
import {useNavigate} from "react-router-dom";
import {theme} from "../styles/theme";
import Play from "../assets/icons/play.svg";
import Mic from "../assets/icons/mic.svg";
import Footer from "../components/CombinedComponents/Footer";
import HeaderArrowComponent from "../components/CombinedComponents/HeaderArrowComponent";
import {useRecording} from "../helpers/useRecording";
import sampleMp3 from '../assets/sounds/sample.mp3';

const stepsListData = [
    "1. Record a question",
    "2. Invite your relatives to answer",
    "3. We'll store it in your family history vault forever",
]

const QuestionCreate: React.FC = () => {
    const navigate = useNavigate();
    const { isRecording, trackUrl, startRecording, stopRecording } = useRecording({ initialTrackUrl: '' });

    const handleRecording = () => {
        if (!isRecording) {
            startRecording()
        } else {
            stopRecording()
        }
    };

    const handlePlaySample = () => {
        const audio = new Audio(sampleMp3);
        audio.play().catch(error => console.error("Error playing the file:", error));
    };

    useEffect(() => {
        if (trackUrl) {
            navigate('/questioncreate', { state: { trackUrl } });
        }
    }, [trackUrl, navigate]);

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
                        <Text
                            fontFamily={theme.fontFamily.ebgaramond}
                            fontWeight={700}
                            fontSize={[32,32,33]}
                            lineHeight={theme.lineHeights.title}
                            width={"100%"}
                        >
                            Start building your family history vault.
                        </Text>
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
                            <img src={Play} alt="play" style={{width: "50px", height: "50px", marginRight: 16.3}}/>

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
                                {isRecording ? 'Save and Next' : 'Recording'}
                            </Text>
                            {isRecording
                                ? <Block width={'20px'} height={'20px'} borderRadius={'20px'} backgroundColor={theme.colors.colorSecondaryRed}></Block>
                                : <img src={Mic} alt="mic" style={{width: "30px", height: "30px"}}/>
                            }
                        </Button>
                    </Block>
                </Block>
            </Container>
            <Footer />
        </>
    );
};

export default QuestionCreate;
