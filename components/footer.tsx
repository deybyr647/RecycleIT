import { Nav } from "react-bootstrap";
import styles from "../styles/etc.module.css";

interface FooterProps {
    style?: string
}

const Footer = ({style}: FooterProps) => {
    return (
        <Nav 
            className={`${style || 'sticky-bottom'} justify-content-center mt-3 ${styles.footerNav}`}
        >
            <Nav.Link href="https://deybyr647.com" target="_blank" rel="noopener noreferrer">
                &copy; 2021 | Deyby Rodriguez
            </Nav.Link>
        </Nav>
    );
};

export default Footer;