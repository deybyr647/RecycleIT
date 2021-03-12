import { useState } from 'react';

import { Container, Row, Col, Jumbotron, Image, Card, CardColumns, ListGroup, Carousel } from 'react-bootstrap';

import Metadata from '../../components/Metadata';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

import Searchbar from '../../components/Searchbar';

const FeedPageContent = () => {
    const [zip, setZip] = useState("");

    const formSubmitHandler = (): void => {
        console.log("Submitted");
        setZip("");
    }

    const onZipCodeChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setZip(e.currentTarget.value);
    }

    const handleClick = (): void => {
        console.log("Clicked");
    }

    return (
        <Container fluid>
            <Row className="d-flex flex-column mb-2">
                <Col>
                    <Searchbar
                        formSubmitAction={formSubmitHandler}
                        formChangeAction={onZipCodeChange}
                        onClickAction={handleClick}
                        formValue={zip}
                    />
                </Col>
            </Row>

            <Row className="mt-2 d-flex flex-column">
                <Col>
                    <Jumbotron>
                        <h2 className="text-center">Happening Near You</h2>
                    </Jumbotron>
                </Col>

                <Col>
                    <CardColumns>
                        <Card>
                            <Card.Img src="https://www.clipartkey.com/mpngs/m/22-220963_science-atom-svg-react-native-logo.png"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste soluta distinctio amet quibusdam voluptatem quis ipsum aliquid deserunt, nobis aperiam aut neque. Quis ratione cupiditate modi, soluta atque ipsa laboriosam.
                                </Card.Text>
                            </Card.Body>

                            <Card.Footer>Updated 3 mins ago</Card.Footer>
                        </Card>

                        <Card>
                            <Card.Img src="https://www.clipartkey.com/mpngs/m/22-220963_science-atom-svg-react-native-logo.png"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste soluta distinctio amet quibusdam voluptatem quis ipsum aliquid deserunt, nobis aperiam aut neque. Quis ratione cupiditate modi, soluta atque ipsa laboriosam.
                                </Card.Text>
                            </Card.Body>

                            <Card.Footer>Updated 3 mins ago</Card.Footer>
                        </Card>

                        <Card>
                            <Card.Img src="https://www.clipartkey.com/mpngs/m/22-220963_science-atom-svg-react-native-logo.png"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste soluta distinctio amet quibusdam voluptatem quis ipsum aliquid deserunt, nobis aperiam aut neque. Quis ratione cupiditate modi, soluta atque ipsa laboriosam.
                                </Card.Text>
                            </Card.Body>

                            <Card.Footer>Updated 3 mins ago</Card.Footer>
                        </Card>

                        <Card>
                            <Card.Img src="https://www.clipartkey.com/mpngs/m/22-220963_science-atom-svg-react-native-logo.png"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste soluta distinctio amet quibusdam voluptatem quis ipsum aliquid deserunt, nobis aperiam aut neque. Quis ratione cupiditate modi, soluta atque ipsa laboriosam.
                                </Card.Text>
                            </Card.Body>

                            <Card.Footer>Updated 3 mins ago</Card.Footer>
                        </Card>

                        <Card>
                            <Card.Img src="https://www.clipartkey.com/mpngs/m/22-220963_science-atom-svg-react-native-logo.png"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste soluta distinctio amet quibusdam voluptatem quis ipsum aliquid deserunt, nobis aperiam aut neque. Quis ratione cupiditate modi, soluta atque ipsa laboriosam.
                                </Card.Text>
                            </Card.Body>

                            <Card.Footer>Updated 3 mins ago</Card.Footer>
                        </Card>
                    </CardColumns>
                </Col>
            </Row>
        </Container>
    )
}

const FeedPage = () => {
    return (
        <>
            <Metadata title="RecycleIT Feed"/>
            <Navigation/>
            <FeedPageContent/>
            <Footer/>
        </>
    )
}

export default FeedPage;