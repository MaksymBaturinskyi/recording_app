import { useState, useEffect } from 'react';
import { useAudioRecorder } from "react-audio-voice-recorder";

interface UseRecordingProps {
    initialTrackUrl?: string;
}

export const useRecording = ({ initialTrackUrl }: UseRecordingProps) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [trackUrl, setTrackUrl] = useState<string>(initialTrackUrl || "");
    const recorder = useAudioRecorder();

    const startRecording = () => {
        recorder.startRecording();
        setIsRecording(true);
    };

    const stopRecording = () => {
        recorder.stopRecording();
        setIsRecording(false);
    };

    const clearRecording = () => {
        if (trackUrl) {
            URL.revokeObjectURL(trackUrl);
            setTrackUrl("");
        }
    };

    useEffect(() => {
        if (recorder.recordingBlob && !isRecording) {
            clearRecording();
            const newUrl = URL.createObjectURL(recorder.recordingBlob);
            setTrackUrl(newUrl);
        }
    }, [recorder.recordingBlob, isRecording]);

    return {
        isRecording,
        trackUrl,
        startRecording,
        stopRecording,
        clearRecording,
    };
};
