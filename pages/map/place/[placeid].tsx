import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';

import Metadata from '../../../components/Metadata';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

import { getPlaceDetails } from '../../../components/api';

const Place = ({data}: any) => {
    console.log(data);
    const router = useRouter();

    const { placeid } = router.query;

    return(
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Place ID: {placeid}</h1>
                    <pre>{JSON.stringify(data, undefined, 2)}</pre>
                </Col>
            </Row>
        </Container>
    )
}

const PlacePage = ({data}: any) => {
    return(
        <>
            <Metadata title="Place Info"/>
            <Navigation/>
            <Place data={data}/>
            <Footer/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { placeid } = context.query;

    try {
        let placeDetails = await getPlaceDetails(placeid);

        return {
            props: {
                data: placeDetails,
                error: null
            }
        }
    } catch(err){
        if(err) console.error(err);

        return {
            props: {
                data: null,
                error: err.toString()
            }
        }
    }
}

export default PlacePage;