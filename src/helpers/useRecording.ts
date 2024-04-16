import {useState, useEffect, useRef} from 'react';
import { useAudioRecorder } from "react-audio-voice-recorder";

interface UseRecordingProps {
    initialTrackUrl?: string;
}

export const useRecording = ({ initialTrackUrl }: UseRecordingProps) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [trackUrl, setTrackUrl] = useState<string>(initialTrackUrl || "");
    const recorder = useAudioRecorder();
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    const checkMicrophonePermissions = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            return false;
        } catch (error) {
            console.log('error permissions', error);
            return true;
        }
    };

    const startRecording = async () => {
        const denied = await checkMicrophonePermissions();
        if (!denied) {
            recorder.startRecording();
            setIsRecording(true);
            startTimer();
        } else {
            setPermissionDenied(true);
        }
    };
    const startTimer = () => {
        intervalId.current = setInterval(() => {
            setRecordingTime((prevTime) => prevTime + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (intervalId.current) clearInterval(intervalId.current);
        setRecordingTime(0);
    };

    const stopRecording = () => {
        if (isRecording) {
            recorder.stopRecording();
            setIsRecording(false);
            stopTimer();
        }
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
        recordingTime,
        permissionDenied,
        startRecording,
        stopRecording,
        clearRecording,
    };
};
