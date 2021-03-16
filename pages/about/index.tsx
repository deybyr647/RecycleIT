import { Container, Row, Col, Jumbotron, Image, Card } from 'react-bootstrap';

import { SiTypescript, SiNextDotJs, SiBootstrap } from 'react-icons/si';
import { IoLogoVercel } from 'react-icons/io5';

import Metadata from '../../components/Metadata';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

import styles from '../../styles/about.module.css';

const AboutContent = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={12} lg={4} xl={3} className="mb-4">
                    <Card className={`${styles.contentContainer} shadow`}>
                        <Card.Img src="/rnm.webp" className="rounded-circle" variant="top"/>
                        <Card.Body>
                            <Card.Title className="text-center">RecycleNearMe</Card.Title>
                            <Card.Text>
                                The idea for RecycleNearMe came to me
                                over summer of 2020, when I participated in
                                ASC. I wanted to create something recycling
                                related which would help make recycling easier. 
                                Thus, over the course of ASC demo week, 
                                RecycleNearMe was born.
                                Half a year later, here's RecycleIT,
                                featuring newer technologies,
                                and a more visually pleasing interface.
                                Feel free to checkout the original
                                RecycleNearMe project below!
                            </Card.Text>
                        </Card.Body>

                        <Card.Body className="mx-auto">
                            <Card.Link 
                                className={`${styles.buttonLink} btn btn-info`}
                                href="https://deybyr647.github.io/RecycleNearMe/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Project Site
                            </Card.Link>

                            <Card.Link 
                                className={`${styles.buttonLink} btn btn-info`}
                                href="https://github.com/deybyr647/RecycleNearMe"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                GitHub
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className="order-first order-lg-0" md={12} lg={4} xl={6}>
                    <Jumbotron className={`${styles.contentContainer} d-flex flex-column align-items-center shadow`}>
                        <h2 className="text-center">About RecycleIT</h2>

                        <Image className="w-50 shadow-lg my-4" roundedCircle src="/logo.webp"/>

                        <h5 className="text-center font-italic">Making Recycling Easy</h5>
                    </Jumbotron>

                    <Jumbotron className={`${styles.contentContainer}`}>
                        <h5 className="text-center pb-5">RecycleIT Was Developed With...</h5>

                        <Container className="d-flex justify-content-center pt-4">
                            <Row>
                                <Col className="mx-4">
                                    <SiNextDotJs size={36}/>
                                </Col>

                                <Col className="mx-4">
                                    <SiBootstrap size={36}/>
                                </Col>

                                <Col className="mx-4">
                                    <SiTypescript size={36}/>
                                </Col>

                                <Col className="mx-4">
                                    <IoLogoVercel size={36}/>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </Col>

                <Col md={12} lg={4} xl={3}>
                    <Card className={`${styles.contentContainer} shadow`}>
                        <Card.Img src="/deyby.webp" className="rounded-circle p-3" variant="top"/>
                        <Card.Body>
                            <Card.Title className="text-center">About Me</Card.Title>
                            <Card.Text>
                                Hi there! My name is Deyby Rodriguez, and I'm the creator
                                of RecycleIT! I'm a Front-End Web Developer who loves to see
                                his code come to life visually. Thank you for using RecycleIT
                                to help you in your Recycling journey, I really appreciate it!
                                If there are any questions or concerns regarding RecycleIT, please
                                do not hesitate to get in contact with me! Lastly,
                                feel free to checkout my website, along with my other work!
                            </Card.Text>
                        </Card.Body>

                        <Card.Body className="mx-auto">
                            <Card.Link 
                                className={`${styles.buttonLink} btn btn-info`}
                                href="https://deybyr647.com"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                My Website
                            </Card.Link>

                            <Card.Link 
                                className={`${styles.buttonLink} btn btn-info`}
                                href="mailto:deybyr647@gmail.com"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Contact
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

const AboutPage = () => {
    return(
        <>
            <Metadata title="About RecycleIT"/>
            <Navigation/>
            <AboutContent/>
            <Footer/>
        </>
    )
}

export default AboutPage;