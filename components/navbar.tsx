import Link from 'next/link';
import {Nav, Navbar} from 'react-bootstrap';
import {FaRecycle} from 'react-icons/fa';

import styles from '../styles/etc.module.css';

const Navigation = () => {
    return(
        <Navbar bg='light' variant='light' expand='lg' className='mb-3'>
            <Navbar.Brand className={styles.anchors}><FaRecycle className={styles.faRecycle}/> <Link href='/'>RecycleIT</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls='nav'/>
            <Navbar.Collapse id='nav'>
                <Nav className={`ml-auto text-center ${styles.anchors}`}>
                    <Nav.Item className='nav-link'>
                        <Link href='/map'>Map</Link>
                    </Nav.Item>

                    <Nav.Item className='nav-link'>
                        <Link href='/news'>News</Link>
                    </Nav.Item>

                    <Nav.Item className='nav-link'>
                        <Link href='/about'>About</Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;