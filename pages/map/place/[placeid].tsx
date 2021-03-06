import { GetServerSideProps } from "next";

import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

import styles from "../../../styles/map.module.css";

import Metadata from "../../../components/Metadata";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";

import { Map, Marker, Coords } from "../../../components/map/Map";
import { getPlaceDetails } from "../../../components/api";

const PlaceDetailsCard = ({data}: any) => {
    return (
        <Card 
            style={{height: "80vh"}} 
            className={`${styles.placeDetails} d-flex flex-column justify-content-between text-center`}
        >
            <Card.Body className="d-flex justify-content-center align-items-center">
                <Card.Title>{data.name}</Card.Title>
            </Card.Body>
            
            <ListGroup className={`${styles.placeDetails} list-group-flush p-3`}>

                <ListGroup.Item className={styles.placeDetails}>
                    Schedule: <br/> <br/>
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
                    Address:<br/>
                    {data.formatted_address}
                </ListGroup.Item>

                <ListGroup.Item className={styles.placeDetails}>
                    Phone Number:&nbsp;
                    <Card.Link 
                        href={`tel:${data.formatted_phone_number}`}
                    >
                        {data.formatted_phone_number ?? "Phone Number Unavailable"}
                    </Card.Link>
                </ListGroup.Item>

                <ListGroup.Item className={styles.placeDetails}>
                    Status: {data.business_status}
                </ListGroup.Item>

                <ListGroup.Item className={styles.placeDetails}>
                    <Card.Link 
                        href={data.website ?? "#"} 
                        className={`btn btn-info ${styles.searchButton}`}
                    >
                        {data.website ? 
                            "Visit Website"
                            :
                            "No Website Available"
                        }
                    </Card.Link>

                    <Card.Link 
                        href={data.url} 
                        className={`btn btn-info ${styles.searchButton}`}
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

    return(
        <Container fluid>
            <Row>
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

                <Col>
                    <PlaceDetailsCard data={data}/>
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
            <Footer style="fixed-bottom"/>
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