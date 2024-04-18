import React, {useState} from 'react';
import {Block, Button, Text} from "../../../components/SimpleComponents";
import {theme} from "../../../styles/theme";
import Stop from "../../../assets/icons/Stop";
import Play from "../../../assets/icons/play.svg";
import sampleMp3 from "../../../assets/sounds/sample.mp3";

const AudioSampleBlock = () => {
    const [sampleActive, setSampleActive] = useState<boolean>(false);
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

    return (
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
    );
};

export default AudioSampleBlock;
