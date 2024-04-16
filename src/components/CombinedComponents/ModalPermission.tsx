import React from 'react';
import {Block, Button, Text} from "../SimpleComponents";

interface ModalProps {
    title: string
    onClose: () => void;
}

const ModalPermission = ({title, onClose}: ModalProps) => {
    return (
        <Button onClick={onClose}>
            <Text>
                {title}
            </Text>
            <Text>Please go to settings and allow mic permissions.</Text>
        </Button>
    );
};

export default ModalPermission;
