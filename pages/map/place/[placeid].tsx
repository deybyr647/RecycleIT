import { GetServerSideProps } from "next";

import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

import styles from "../../../styles/map.module.css";

import Metadata from "../../../components/Metadata";
import Navigation from "../../../components/Navigation";
import Footer, { FooterPosition } from "../../../components/Footer";

import { Map, Marker, Coords } from "../../../components/map/Map";
import { getPlaceDetails } from "../../../components/api";

const PlaceDetailsCard = ({data}: any) => {
    return (
        <Card 
            className={`${styles.placeDetailsCard} text-center`}
        >
            <Card.Title className="m-auto p-3">{data.name}</Card.Title>
            
            <ListGroup className={`${styles.placeDetails} list-group-flush p-3`}>

                <ListGroup.Item className={styles.placeDetails}>
                    <b>Schedule:</b> <br/> <br/>
                    {   
                        data.opening_hours ?
                        (data.opening_hours.weekday_text.map((el: any, index: any) => (
                            <Card.Text key={index}>{el}</Card.Text>
                        )))
                        :
                        "Unknown"
                    }
                </ListGroup.Item>

                <ListGroup.Item className={styles.placeDetails}>
                    <b>Address:</b> <br/>
                    {data.formatted_address}
                </ListGroup.Item>

                <ListGroup.Item className={styles.placeDetails}>
                    <b>Phone Number:</b>&nbsp;
                    <Card.Link 
                        href={`tel:${data.formatted_phone_number}`}
                    >
                        {data.formatted_phone_number ?? "Phone Number Unavailable"}
                    </Card.Link>
                </ListGroup.Item>

                <ListGroup.Item className={styles.placeDetails}>
                    <b>Status:</b> {data.business_status}
                </ListGroup.Item>

                <ListGroup.Item className={styles.placeDetails}>
                    <Card.Link 
                        href={data.website ?? "#"} 
                        className={`btn btn-info ${styles.placeCardButton} m-2`}
                    >
                        {data.website ? 
                            "Visit Website"
                            :
                            "No Website Available"
                        }
                    </Card.Link>

                    <Card.Link 
                        href={data.url} 
                        className={`btn btn-info ${styles.placeCardButton} m-2`}
                    >
                        See in Google Maps
                    </Card.Link>
                </ListGroup.Item>

            </ListGroup>
        </Card>
    )
}

const PlacePageContent = ({data, err}: any) => {
    const centerCoords: Coords = {
        lat: data.geometry.location.lat,
        lng: data.geometry.location.lng
    }

    return (
        <Container fluid>
            <Row>
                <Col className="mb-4">
                    <PlaceDetailsCard data={data}/>
                </Col>

                <Col md={12} lg={7} xl={7}>
                    <Map 
                        center={centerCoords}
                        zoom={18}
                    >
                        <Marker
                            color="red" /* @ts-ignore */
                            lat={centerCoords.lat}
                            lng={centerCoords.lng}
                        />
                    </Map>
                </Col>
            </Row>
        </Container>
    )
}

const PlacePage = ({data}: any) => {
    return (
        <>
            <Metadata title="Place Info"/>
            <Navigation/>
            <PlacePageContent data={data}/>
            <Footer position={FooterPosition.Sticky}/>
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
    } catch(err) {
        console.error(err);

        return {
            props: {
                data: null,
                error: err.toString()
            }
        }
    }
}

export default PlacePage;
