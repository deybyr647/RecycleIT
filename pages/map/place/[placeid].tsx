import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';

import Metadata from '../../../components/metadata';
import Navigation from '../../../components/navbar';
import Footer from '../../../components/footer';

import { getPlaceDetails } from '../../../components/util';

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
                data: placeDetails
            }
        }
    } catch(err){
        if(err) console.error(err);

        return {
            props: {
                error: "Error!"
            }
        }
    }
}

export default PlacePage;