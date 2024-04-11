import React from 'react';
import {Block, Button, SimpleInput, Text} from "../SimpleComponents";
import {theme} from "../../styles/theme";
import {Container} from "../SimpleComponents/Container";
import Arrow from "../../assets/icons/arrow_down_white.svg";
import styled from "styled-components";

const stepsListData = [
    "Our company",
    "Our team",
    "Company Vision",
    "Our History",
    "Investors"
]

const InteractiveText = styled(Text)`
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover, &:active {
    font-family: "EB Garamond";
    font-weight: bold;
  }
`;
const Footer = () => {
    return (
        <Block
            display={['none','block','block']}
            position={'fixed'}
            bottom={'0px'}
            width={'100%'}
            height={['270px','343px','343px']}
            backgroundColor={theme.colors.colorPrimary}
            paddingTop={20}
            paddingBottom={20}
        >
            <Container
                maxWidth={'926px'}
                width={'100%'}
                justifyContent={['','space-between','space-between']}
                alignItems={'center'}
                flexDirection={['column', 'row', 'row']}
            >
                <Block flexDirection={'column'} width={'100%'}>
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
                            color={theme.colors.colorWhite}
                            paddingTop={14}
                            paddingBottom={19}
                            width={['150px','237px','237px']}
                            borderBottomColor={theme.colors.colorWhite}
                            borderBottomWidth={'1px'}
                            marginRight={60}
                        />
                        <Button
                            backgroundColor={theme.colors.colorWhite}
                            height={'52px'}
                            width={['100px','158px','158px']}
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

                <Block
                    flexDirection={['row','column','column']}
                    mt={[30,0,0]}
                    mb={[20,0,0]}
                    width={['100%','auto', 'auto']}
                    justifyContent={['space-between', 'space-between', '']}
                >
                    {
                        stepsListData.map((step: string, index: number) => {
                            return (
                                <Block
                                    key={index}
                                >
                                    <InteractiveText
                                        marginBottom={[0,24,24]}
                                        marginRight={['5px',0,0]}
                                        fontWeight={400}
                                        fontSize={16}
                                        color={theme.colors.colorWhite}
                                        fontFamily={theme.fontFamily.inter}
                                    >
                                        {step}
                                    </InteractiveText>
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
