import { Container, Row, Col, Jumbotron, Image, Card } from 'react-bootstrap';

import Metadata from '../../components/Metadata';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

import styles from '../../styles/about.module.css';

const AboutContent = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={12} lg={4} xl={3}>
                    <Jumbotron className={`${styles.contentContainer} shadow`}>
                        <h2 className="text-center">History</h2>
                    </Jumbotron>

                    <Row>

                    </Row>
                </Col>

                <Col className="order-first order-lg-0" md={12} lg={4} xl={6}>
                    <Jumbotron className={`${styles.contentContainer} d-flex flex-column align-items-center shadow`}>
                        <h2 className="text-center">About RecycleIT</h2>

                        <Image className="w-50 shadow-lg my-4" roundedCircle src="/logo.png"/>

                        <h5 className="text-center font-italic">Making Reycling Easy</h5>
                    </Jumbotron>
                </Col>

                <Col md={12} lg={4} xl={3}>
                    <Jumbotron className={`${styles.contentContainer} shadow`}>
                        <h2 className="text-center">About Me</h2>
                    </Jumbotron>

                    <Card>
                        <Card.Img src="/deyby.jpg" className="rounded-circle border-0 p-2" variant="top"/>
                        <Card.Body>
                            <Card.Title>Deyby Rodriguez</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quidem dolorem natus! Non, eaque! Assumenda eaque cum dolorum, similique sint suscipit quisquam saepe autem eveniet nobis quaerat harum ab esse.
                            </Card.Text>
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