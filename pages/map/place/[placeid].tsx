import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';

import Metadata from '../../../components/metadata';
import Navigation from '../../../components/navbar';
import Footer from '../../../components/footer';

const Place = () => {
    const router = useRouter();
    const { placeid } = router.query;

    return(
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Place ID: {placeid}</h1>
                </Col>
            </Row>
        </Container>
    )
}

const PlacePage = () => {
    return(
        <>
            <Metadata title="Place Info"/>
            <Navigation/>
            <Place/>
            <Footer/>
        </>
    )
}

export default PlacePage;