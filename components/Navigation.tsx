import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import { FaRecycle } from "react-icons/fa";

import styles from "../styles/etc.module.css";

const Navigation = () => {
    return (
        <Navbar variant="dark" expand="md" className={`mb-3 ${styles.footerNav} sticky-top`}>
            <Navbar.Brand className={styles.anchors}><FaRecycle className={styles.faRecycle}/>&nbsp;<Link href="/">RecycleIT</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="nav"/>
            <Navbar.Collapse id="nav">
                <Nav className={`ml-auto text-center ${styles.anchors}`}>
                    <Nav.Item className="nav-link">
                        <Link href="/map">Map</Link>
                    </Nav.Item>

                    <Nav.Item className="nav-link">
                        <Link href="/feed">Feed</Link>
                    </Nav.Item>

                    <Nav.Item className="nav-link">
                        <Link href="/about">About</Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;