import React, {useState} from "react";
import {Block, Button, SimpleInput, Text} from "../../components/SimpleComponents";
import {Container} from "../../components/SimpleComponents/Container";
import {useNavigate} from "react-router-dom";
import {theme} from "../../styles/theme";
import google from "../../assets/icons/google.svg";
import HeaderArrowComponent from "../../components/CombinedComponents/HeaderArrowComponent";
import Footer from "../../components/CombinedComponents/Footer";
import ButtonBack from "../../components/CombinedComponents/ButtonBack";
import TextTitle from "../../components/CombinedComponents/TextTitle";
import {MainContainer} from "../../components/SimpleComponents/MainContainer";

const formFields = [
    {
        placeholder: "Enter email address",
        label: "Email",
        type: "email",
        fieldKey: "email"
    },
    // {
    //     placeholder: "Enter your password",
    //     label: "Password",
    //     type: "password",
    //     fieldKey: "password"
    //
    // }
]

interface loginFormInterface {
    email?: string;
    password?: string;
    isValid?: boolean;
    error?: {
        email?: string;
        password?: string;
    };
}

const AccountCreate: React.FC = () => {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState<loginFormInterface>({});

    const handleFormEvent = (fieldKey: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [fieldKey]: e.target.value
        })
    }
    console.log("formValue");
    console.log(formValue);

    const handleSubmit = () => {
        // navigate('/accountcreate')
    }
    return (
        <MainContainer>
            <Container
                flexDirection={"column"}
                alignItems={"center"}
                width={"100%"}
            >
                <HeaderArrowComponent />
                <Block
                    justifyContent={'space-between'}
                    flexDirection={['column', 'row', 'row']}
                    width={"100%"}
                    maxWidth={'830px'}
                    mt={['20px', '20px', '80px']}
                >
                    <Block width={'100%'} flexDirection={'column'} mr={'10px'}>
                        <ButtonBack />
                        <Text
                            mt={5}
                            fontSize={28}
                            fontStyle={"italic"}
                            fontWeight={400}
                            fontFamily={theme.fontFamily.ebgaramond}
                            width={"100%"}
                        >
                            And while they are answering
                        </Text>
                        <TextTitle title={'Lets create your family account to listen to the answers'} mt={['5px']} />
                    </Block>
                    <Block
                        justifyContent={"center"}
                        flexDirection={"column"}
                        alignSelf={"center"}
                        width={"100%"}
                    >
                        {formFields.map((field) => {
                            return (
                                <Block
                                    mt={3}
                                    width={"100%"}
                                    borderRadius={14}
                                    border={`2px solid ${theme.colors.colorBorderGray}`}
                                    position={"relative"}
                                    flexWrap={"wrap"}
                                    key={field.fieldKey}
                                    px={'24px'}
                                    py={'12px'}
                                >
                                    <Text
                                        color={theme.colors.colorTextGray}
                                        fontSize={'12px'}
                                    >
                                        {field.label}
                                    </Text>
                                    <SimpleInput
                                        pt={'4px'}
                                        width={"100%"}
                                        fontSize={"18px"}
                                        placeholder={field.placeholder}
                                        border={0}
                                        onChange={handleFormEvent(field.fieldKey)}
                                    />
                                </Block>
                            )
                        })}
                        <Button
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            width={"100%"}
                            height={"59px"}
                            mt={'30px'}
                            borderRadius={14}
                            backgroundColor={theme.colors.colorPrimary}
                            onClick={handleSubmit}
                        >
                            <Text
                                color={theme.colors.colorWhite}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={700}
                                fontSize={20}
                                marginRight={3}
                            >
                                Create account
                            </Text>
                        </Button>
                        <Text
                            mt={'12px'}
                            color={theme.colors.colorTextGray}
                            fontFamily={theme.fontFamily.inter}
                            fontWeight={400}
                            fontSize={18}
                            textAlign={'center'}
                        >
                            or
                        </Text>
                        <Button
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            width={"100%"}
                            height={"59px"}
                            mt={'12px'}
                            borderRadius={14}
                            border={`2px solid ${theme.colors.colorBorderGray}`}
                            onClick={handleSubmit}
                        >
                            <img src={google} alt="google" style={{width: "20px", height: "20px"}}/>
                            <Text
                                ml={'7px'}
                                color={theme.colors.colorPrimary}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={400}
                                fontSize={20}
                            >
                                Continue with Google
                            </Text>
                        </Button>

                        <Block
                            mt={'30px'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Text
                                color={theme.colors.colorTextGray}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={400}
                                fontSize={18}
                            >
                                Already have an account?
                            </Text>
                            <Button
                                onClick={() => {}}
                            >
                                <Text
                                    ml={'4px'}
                                    color={theme.colors.colorPrimary}
                                    fontFamily={theme.fontFamily.inter}
                                    fontWeight={700}
                                    fontSize={18}
                                >
                                    Log in
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Container>
            <Footer />
        </MainContainer>
    );
};

export default AccountCreate;
