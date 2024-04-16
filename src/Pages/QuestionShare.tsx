import React, {useState} from "react";
import {Block, Button, SimpleInput, Text} from "../components/SimpleComponents";
import {Container} from "../components/SimpleComponents/Container";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import '../App.css'
import {useNavigate} from "react-router-dom";
import Footer from "../components/CombinedComponents/Footer";
import HeaderArrowComponent from "../components/CombinedComponents/HeaderArrowComponent";
import {theme} from "../styles/theme";
import link from "../assets/icons/link.svg";
import back from "../assets/icons/arrow-back.svg";

const QuestionShare: React.FC = () => {
    const [shareValue, setShareValue] = useState<string>("");
    const [shareType, setShareType] = useState<string>("sms");
    const navigate = useNavigate()

    const changeShareType = (value: string) => () =>{
        setShareValue("")
        setShareType(value)
    }

    const handleSubmit = () => {
        navigate('/accountcreate')
    }

    const handleCopyUrl = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
    }

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
                    <Block
                        mr={['0px','60px','60px']}
                        width={'100%'}
                        flexDirection={'column'}
                    >
                        <Block
                            display={['none','block','block']}
                            width={"100%"}
                        >
                            <Button onClick={() => navigate(-1)}>
                                <img src={back} alt="back" style={{width: "20px", height: "20px"}}/>
                            </Button>
                        </Block>
                        <Text
                            mt={'10px'}
                            fontFamily={theme.fontFamily.inter}
                            fontWeight={700}
                            fontSize={18}
                            width={"100%"}

                        >
                            Share question via
                        </Text>
                    </Block>
                    <Block width={'100%'} flexDirection={'column'}>
                        <Block
                            mt={3}
                            width={"100%"}
                        >
                            <Button
                                onClick={changeShareType("sms")}
                            >
                                <Text
                                    fontFamily={theme.fontFamily.inter}
                                    fontWeight={shareType === "sms" ? 700 : 400}
                                    fontSize={18}
                                    color={shareType === "sms" ? theme.colors.colorPrimary : theme.colors.colorTextGray}
                                    borderBottom={shareType === "sms" ? `1px solid ${theme.colors.colorPrimary}` : "none"}
                                >
                                    SMS
                                </Text>
                            </Button>
                            <Button
                                ml={'20px'}
                                onClick={changeShareType("email")}
                            >
                                <Text
                                    fontFamily={theme.fontFamily.inter}
                                    fontWeight={shareType !== "sms" ? 700 : 400}
                                    fontSize={18}
                                    color={shareType !== "sms" ? theme.colors.colorPrimary : theme.colors.colorTextGray}
                                    borderBottom={shareType !== "sms" ? `1px solid ${theme.colors.colorPrimary}` : "none"}
                                >
                                    Email
                                </Text>
                            </Button>
                        </Block>

                        <Block
                            mt={'20px'}
                            width={"100%"}
                            borderRadius={"14px"}
                            border={`2px solid ${theme.colors.colorPrimary}`}
                            position={"relative"}
                        >
                            {
                                shareType === "sms" ? (
                                        <>
                                            <Text
                                                position={'absolute'}
                                                color={theme.colors.colorTextGray}
                                                fontFamily={theme.fontFamily.inter}
                                                fontWeight={400}
                                                fontSize={'12px'}
                                                left={'10px'}
                                                top={'6px'}
                                            >
                                                Country
                                            </Text>
                                            <Text
                                                position={'absolute'}
                                                color={theme.colors.colorTextGray}
                                                fontFamily={theme.fontFamily.inter}
                                                fontWeight={400}
                                                fontSize={'12px'}
                                                left={'80px'}
                                                top={'6px'}
                                            >
                                                Phone number
                                            </Text>
                                            <PhoneInput
                                                position={'relative'}
                                                defaultCountry="US"
                                                placeholder="Enter phone number"
                                                value={shareValue}
                                                //@ts-ignore
                                                onChange={(val)=>{
                                                    if (val){
                                                        setShareValue(val)
                                                    }
                                                }}
                                                style={{
                                                    padding: "10px",
                                                    paddingTop: '12px',
                                                    width: "100%",
                                                    fontSize: "24px",
                                                }}
                                            />
                                        </>
                                    )
                                    : <SimpleInput
                                        width={"100%"}
                                        placeholder="Enter email"
                                        padding={3}
                                        fontSize={"18px"}
                                        borderRadius={"100px"}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setShareValue(e.target.value)
                                        }}
                                    />

                            }
                        </Block>
                        <Button
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            width={"100%"}
                            height={"59px"}
                            mt={'30px'}
                            disabled={shareValue.length === 0}
                            borderRadius={14}
                            backgroundColor={theme.colors.colorPrimary}
                            boxShadow="4.95px 4.95px 9.9px 0 rgba(0, 0, 0, 0.2)"
                            onClick={handleSubmit}
                        >
                            <Text
                                color={theme.colors.colorWhite}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={700}
                                fontSize={20}
                                marginRight={3}
                            >
                                Invite them to answer
                            </Text>
                        </Button>

                        <Button
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            mt={3}
                            onClick={handleCopyUrl}
                        >
                            <img src={link} alt="play" style={{width: "20px", height: "20px"}}/>
                            <Text
                                ml={'3px'}
                                color={theme.colors.colorTextGray}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={400}
                                fontSize={18}
                            >
                                Copy URL to share
                            </Text>
                        </Button>
                    </Block>
                </Block>
            </Container>
            <Footer />
        </>
    );
};

export default QuestionShare;
