import { useState } from 'react';

import { Container, Row, Col, Jumbotron, Image, Card, ListGroup } from 'react-bootstrap';

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

            <Row className="d-flex flex-column mt-2">
                <Col>
                    <Jumbotron>
                        <h2>Happening Near You</h2>
                    </Jumbotron>
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