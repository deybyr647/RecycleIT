import { Nav } from "react-bootstrap";
import styles from "../styles/etc.module.css";

const Footer = () => {
    return(
        <Nav className={`sticky-bottom justify-content-center mt-3 ${styles.footerNav}`}>
            <Nav.Link href="https://deybyr647.com" target="_blank" rel="noopener noreferrer">
                &copy; 2021 | Deyby Rodriguez
            </Nav.Link>
        </Nav>
    );
};

export default Footer;