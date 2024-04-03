import React, {useEffect, useState} from "react";
import {Block, Button, Text} from "../components/SimpleComponents";
import {LiveAudioVisualizer} from 'react-audio-visualize';
import {useAudioRecorder} from 'react-audio-voice-recorder';

interface ReactMediaRecorderHookProps {
    startRecording: () => void;
    stopRecording: () => void;
    pauseRecording: () => void;
    mediaBlobUrl?: string | null;

}

const QuestionCreate: React.FC = () => {
    const [second, setSecond] = useState<string>("00");
    const [minute, setMinute] = useState<string>("00");
    const [isActive, setIsActive] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [tracksList, setTracksList] = useState<string[]>(['asd']);
    const [selectedTrackUrl, setSelectedTrackUrl] = useState<string | null>(null);
    const recorder = useAudioRecorder();


    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond =
                    String(secondCounter).length === 1
                        ? `0${secondCounter}`
                        : String(secondCounter);
                const computedMinute =
                    String(minuteCounter).length === 1
                        ? `0${minuteCounter}`
                        : String(minuteCounter);

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter((counter) => counter + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);

    function stopTimer(): void {
        setIsActive(false);
        setCounter(0);
        setSecond("00");
        setMinute("00");
    }


    useEffect(() => {
        if (recorder.recordingBlob) {
            const url = URL.createObjectURL(recorder.recordingBlob);
            setTracksList((tracksState: string[]) => [...tracksState, url]);
        }
    }, [recorder.recordingBlob]);

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                border: "1px solid black",
                backgroundColor: "black",
                height: "100vh",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text>Question share</Text>

        </div>
    );
};

export default QuestionCreate;
