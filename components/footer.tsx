import {Nav} from "react-bootstrap";

const Footer = () => {
    return(
        <Nav className="sticky-bottom justify-content-center bg-light mt-3">
            <Nav.Link href="https://deybyr647.com" target="_blank" rel="noopener noreferrer">
                &copy; 2021 | Deyby Rodriguez
            </Nav.Link>
        </Nav>
    );
};

export default Footer;