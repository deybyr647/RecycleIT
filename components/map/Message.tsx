import { useState } from 'react';
import { Alert } from 'react-bootstrap';

import styles from '../../styles/map.module.css';

interface MessageProps {
    heading: string,
    children: React.ReactNode
    variant?: string
}

const Message = ({heading, children, variant}: MessageProps) => {
    const [alert, setAlert] = useState(true);

    return (
        <Alert 
            show={alert} 
            dismissible 
            onClose={() => setAlert(false)} 
            className={variant ? undefined : styles.message}
            variant={variant}
        >
            <Alert.Heading>{heading}</Alert.Heading>
            {children}
        </Alert>
    );
}

export default Message;