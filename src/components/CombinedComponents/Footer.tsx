import React from 'react';
import {Block, Button, SimpleInput, Text} from "../SimpleComponents";
import {theme} from "../../styles/theme";
import {Container} from "../SimpleComponents/Container";
import Arrow from "../../assets/icons/arrow_down_white.svg";

const stepsListData = [
    "Our company",
    "Our team",
    "Company Vision",
    "Our History",
    "Investors"
]
const Footer = () => {
    return (
        <Block
            maxHeight={'343px'}
            height={'343px'}
            backgroundColor={theme.colors.colorPrimary}
            paddingTop={80}
            paddingBottom={80}
        >
            <Container
                maxWidth={'926px'}
                justifyContent={'space-between'}
            >
                <Block flexDirection={'column'}>
                    <img src={Arrow} alt="play" style={{
                        width: "28px",
                        height: "26px",
                        fill: theme.colors.colorWhite,
                        color: theme.colors.colorWhite
                    }}/>
                    <Text
                        mt={43}
                        fontSize={22}
                        fontFamily={theme.fontFamily.ebgaramond}
                        fontWeight={500}
                        color={theme.colors.colorWhite}
                    >
                        Subscribe to our newsletter
                    </Text>
                    <Block
                        mt={13}
                    >
                        <SimpleInput
                            fontSize={16}
                            fontWeight={400}
                            fontFamily={theme.fontFamily.inter}
                            onChange={() => {}}
                            placeholder={'Insert your email'}
                            paddingTop={14}
                            paddingBottom={19}
                            width={'237px'}
                            borderBottomColor={theme.colors.colorWhite}
                            borderBottomWidth={'1px'}
                            marginRight={60}
                        />
                        <Button
                            backgroundColor={theme.colors.colorWhite}
                            height={'52px'}
                            width={'158px'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            borderRadius={20}
                            onClick={() => {}}
                        >
                            <Text
                                fontSize={16}
                                fontFamily={theme.fontFamily.inter}
                                fontWeight={500}
                                color={theme.colors.colorPrimary}
                            >
                                Subscribe
                            </Text>
                        </Button>
                    </Block>
                </Block>

                <Block flexDirection={'column'}>
                    {
                        stepsListData.map((step: string, index: number) => {
                            return (
                                <Block
                                    key={index}
                                >
                                    <Text
                                        marginBottom={24}
                                        fontWeight={400}
                                        fontSize={16}
                                        color={theme.colors.colorWhite}
                                        fontFamily={theme.fontFamily.inter}
                                        // textIndent={"-21px"}
                                        // paddingLeft={"30px"}
                                    >
                                        {step}
                                    </Text>
                                </Block>
                            );
                        })
                    }
                </Block>
            </Container>
        </Block>
    );
};

export default Footer;
