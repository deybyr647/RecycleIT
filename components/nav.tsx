import Link from 'next/link';
import { ReactChild } from 'react';
import {Nav, Navbar} from 'react-bootstrap';

const Navigation = () => {
    return(
        <Navbar bg='light' variant='light' expand='lg' className=''>
            <Navbar.Brand>Home</Navbar.Brand>
            <Navbar.Toggle aria-controls='nav'/>
            <Navbar.Collapse id='nav'>
                <Nav>
                    <Nav.Link href='/map'>Map</Nav.Link>
                    <Nav.Link href='/news'>News</Nav.Link>
                    <Nav.Link href='/about'>About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;