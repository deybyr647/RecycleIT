import { useState } from 'react';
import { Alert } from 'react-bootstrap';

import styles from '../../styles/map.module.css';

interface MessageProps {
    heading: string,
    children: React.ReactNode
}

const Message = ({heading, children}: MessageProps) => {
    const [alert, setAlert] = useState(true);

    return(
        <Alert show={alert} dismissible onClose={() => setAlert(false)} className={styles.message}>
            <Alert.Heading>{heading}</Alert.Heading>
            {children}
        </Alert>
    );
}

export default Message;