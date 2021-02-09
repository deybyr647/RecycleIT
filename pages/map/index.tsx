import Head from 'next/head';
import {Container, Row, Col} from 'react-bootstrap';

import Footer from '../../components/footer';
import Navigation from '../../components/navbar';

interface MapContent{
    children: React.ReactNode
}

const MapContent = ({children}: MapContent) => {
    return(
        <Container>
            {children}
            <Row>
                <Col>
                    <h3>Map Coming Soon!</h3>
                </Col>
            </Row>
        </Container>
    )
}

const Map = () => {
    return(
        <>
            <Navigation/>
            <MapContent>
                <Head>
                    <title>RecycleIT Map</title>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                        crossOrigin="anonymous"
                    />
                </Head>
            </MapContent>
            <Footer/>
        </>
    )
}

export default Map