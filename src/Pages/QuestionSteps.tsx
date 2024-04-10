import React from "react";
import {Block, Button, Text} from "../components/SimpleComponents";
import {Container} from "../components/SimpleComponents/Container";
import {useNavigate} from "react-router-dom";
import {theme} from "../styles/theme";
import Play from "../assets/icons/play.svg";
import Mic from "../assets/icons/mic.svg";
import Arrow from "../assets/icons/arrow_down.svg";
import {useWindowSize} from "../helpers/useWindowSize";
import Footer from "../components/CombinedComponents/Footer";


const stepsListData = [
    "1. Record a question",
    "2. Invite your relatives to answer",
    "3. We'll store it in your family history vault forever",
]

const QuestionCreate: React.FC = () => {
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const isDesktop = width >= 600;

    return (
        <>
            <Container
                pt={5}
                flexDirection={"column"}
                alignItems={"center"}
                width={"100%"}
                minHeight={isDesktop ? 'calc(100vh - 343px)' : '100vh'}
                backgroundColor={theme.colors.colorBg}
            >
                <Block
                    width={'100%'}
                    height={'52px'}
                    marginBottom={[0,0,32]}
                    borderRadius={20}
                    paddingLeft={[0,0,30.5]}
                    paddingTop={'4px'}
                    alignItems={'center'}
                    backgroundColor={['transparent','transparent', theme.colors.colorSecBg]}
                >
                    <img src={Arrow} alt="play" style={{
                        width: "28px",
                        height: "26px"
                    }}/>
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
                        <Block
                            mt={40}
                            width={'100%'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            height={'52px'}
                        >
                            <img src={Play} alt="play" style={{width: "50px", height: "50px", marginRight: 16.3}}/>

                            <Text
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={400}
                                fontSize={18}
                                color={theme.colors.colorTextGray}
                            >
                                Listen to a sample question
                            </Text>
                        </Block>
                        <Text
                            marginTop={40}
                            fontWeight={700}
                            fontFamily={theme.fontFamily.inter}
                            fontSize={18}
                            width={"100%"}
                        >
                            Ask a question you want answered
                        </Text>

                        <Block
                            justifyContent={"center"}
                            width={"100%"}
                            mt={4}
                        >
                            <Button
                                width={"100%"}
                                height={"59px"}
                                px={4}
                                py={3}
                                backgroundColor={[theme.colors.colorSecondaryRed,theme.colors.colorSecondaryRed,theme.colors.colorPrimary]}
                                borderRadius={14}
                                borderWidth={0}
                                color={"white"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                onClick={() => {
                                    navigate('/questioncreate')
                                }}
                                boxShadow='4.95px 4.95px 9.9px 0 rgba(0, 0, 0, 0.2)'
                            >
                                <Text
                                    fontFamily={theme.fontFamily.inter}
                                    fontWeight={700}
                                    fontSize={20}
                                    marginRight={3}
                                >
                                    Record
                                </Text>
                                <img src={Mic} alt="mic" style={{width: "30px", height: "30px"}}/>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Container>
            {isDesktop && <Footer />}
        </>
    );
};

export default QuestionCreate;
