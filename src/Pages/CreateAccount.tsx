import React, {useEffect, useState} from "react";
import {Block, Button} from "../components/SimpleComponents";
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
            <div style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "38px"
            }}>
                {" "}
                <audio src={selectedTrackUrl || ""} controls/>
            </div>

            <Block
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                {
                    tracksList.map((trackUrl: string, index: number) => {
                        return (
                            <Button
                                cursor={"pointer"}
                                key={index}
                                mt={1}
                                onClick={() => setSelectedTrackUrl(trackUrl)}
                                px={2}
                                py={3}
                                backgroundColor={"transparent"}
                                color={"white"}
                                borderWidth={0}
                                borderRadius={8}
                            >
                                {trackUrl}
                            </Button>
                        );
                    })
                }

            </Block>
            <div
                style={{
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <div

                    style={{
                        marginTop: "20px",
                        fontSize: "54px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                    }}>
                    <span className="minute">{minute}</span>
                    <span>:</span>
                    <span className="second">{second}</span>
                </div>
                <div style={{display: "flex"}}>
                    <label
                        style={{
                            fontSize: "15px",
                            fontWeight: "Normal"
                        }}
                        htmlFor="icon-button-file"
                    >
                        <h3 style={{fontWeight: "normal", textAlign: "center"}}>
                            Press the Start to record
                        </h3>

                        {recorder.mediaRecorder && (
                            <LiveAudioVisualizer
                                mediaRecorder={recorder.mediaRecorder}
                                width={200}
                                height={75}
                            />
                        )}

                        <div>
                            <Button
                                px={4}
                                py={3}
                                backgroundColor={"#42b72a"}
                                borderRadius={8}
                                borderWidth={0}
                                ml={2}
                                color={"white"}
                                onClick={() => {
                                    if (!recorder.isRecording) {
                                        recorder.startRecording();
                                    } else {
                                        recorder.togglePauseResume();
                                    }

                                    setIsActive(!isActive);
                                }}
                            >
                                {isActive ? "Pause" : "Start"}
                            </Button>
                            <Button
                                px={4}
                                py={3}
                                backgroundColor={"#df3636"}
                                borderRadius={8}
                                borderWidth={0}
                                ml={2}
                                color={"white"}
                                onClick={() => {
                                    recorder.stopRecording();
                                    //@ts-ignore
                                    // handleFile(recorder.recordingBlob);
                                    stopTimer();
                                    setIsActive(false);
                                }}
                            >
                                Stop
                            </Button>
                        </div>
                    </label>
                </div>
                <b></b>
            </div>
        </div>
    );
};

export default QuestionCreate;
