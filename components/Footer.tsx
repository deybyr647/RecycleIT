import { Nav } from "react-bootstrap";
import styles from "../styles/etc.module.css";

export enum FooterPosition {
    Sticky,
    Fixed
}

interface FooterProps {
    position?: FooterPosition
}

const Footer = ({position = FooterPosition.Sticky}: FooterProps) => {

    const positionClasses = {
        [FooterPosition.Sticky]: "sticky-bottom",
        [FooterPosition.Fixed]: "fixed-bottom"
    }

    return (
        <Nav 
            className={`${positionClasses[position]} justify-content-center mt-3 ${styles.footerNav}`}
        >
            <Nav.Link href="https://deybyr647.com" target="_blank" rel="noopener noreferrer">
                &copy; 2021 | Deyby Rodriguez
            </Nav.Link>
        </Nav>
    );
};

export default Footer;
