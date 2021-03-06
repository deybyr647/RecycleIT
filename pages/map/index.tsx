import { useEffect, useState } from "react";
import GoogleMap from "google-map-react";

import { Container, Row, Col, Form, Button, Alert, Jumbotron } from "react-bootstrap";
import { BiCurrentLocation, BiSearchAlt } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "../../styles/map.module.css";

import MetaData from "../../components/metadata";
import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import PlaceCard from "../../components/placeCard";
import { getPlaceData, getPlaceDataWithZip } from '../../components/util';

const mapsKey: string | undefined = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;

interface Coords {
    lat: number,
    lng: number
};

interface MapProps {
    center: Coords,
    children?: React.ReactNode
};   

interface MarkerProps {
    color: string
}

interface MessageProps {
    heading: string,
    children: React.ReactNode
}

const Message = ({heading, children}: MessageProps) => {
    const [alert, setAlert] = useState(true);

    return(
        <Alert show={alert} dismissible onClose={() => setAlert(false)} className={styles.message}>
            <Alert.Heading>{heading}</Alert.Heading>
            {children}
        </Alert>
    );
}

const Marker = ({color}: MarkerProps) => (
    <FaMapMarkerAlt
        color={color}
        size={36}
        className={styles.marker}
    />
);

const Map = ({center, children}: MapProps) => {
    const defaultCoords: Coords = {lat: 40.7128, lng: -74.0060};
    const mapOptions = {
        mapTypeControl: true,
        streetViewControl: true
    };

    let isNull = Object.values(center).every(obj => obj === null);
    
    return(
        <div className={`${styles.map} shadow rounded`}>
            <GoogleMap
                //@ts-ignore
                bootstrapURLKeys={{key: mapsKey}}
                defaultCenter={defaultCoords}
                center={isNull ? defaultCoords : center}
                defaultZoom={12}
                options={mapOptions}
                yesIWantToUseGoogleMapApiInternals
            >
                {children}   
            </GoogleMap>
        </div>        
    );
}

const MapPageContent = () => {
    const [zip, setZip] = useState("");
    const [isZip, setIsZip] = useState(false);
    const [userCoords, setUserCoords] = useState({lat: null, lng: null});
    const [focusedMarker, setFocusedMarker] = useState({lat: null, lng: null});
    const [isFocused, setIsFocused] = useState(false);
    const [places, setPlaces] = useState([]);
    
    const changeHandler = (e: any): void => {
        e.preventDefault();
        setZip(e.target.value);
    };

    const focusHandler = (e: any, coords: Coords) => {
        e.preventDefault();
        setFocusedMarker((prev: any) => {
            return {
                ...prev,
                lat: coords.lat,
                lng: coords.lng
            }
        });

        setIsFocused(true);
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        
        (async () => {
            let placeData = await getPlaceDataWithZip(zip); //@ts-ignore
            setPlaces(placeData.data);
            setUserCoords(prev => {
                return {
                    ...prev,                                //@ts-ignore
                    lat: placeData.coords.lat,              //@ts-ignore
                    lng: placeData.coords.lng
                }
            })
            setIsZip(true);
            setIsFocused(false);
            setZip("");
        })();
    }

    const getUserCoords = (e: any): void => {
        e.preventDefault();

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                let userCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }

                setUserCoords((prev: any) => {
                    return {
                        ...prev,
                        lat: userCoords.lat,
                        lng: userCoords.lng
                    };
                });

                setIsZip(false);
                setIsFocused(false);
            });
        };
    };

    useEffect(() => {
        (async () => {
            let placeData = await getPlaceData(userCoords);
            setPlaces(placeData);
        })();
    }, [userCoords]);

    return(
        <Container fluid>
            <Row className="mb-2 d-flex flex-column">
                <Col>
                    <Form className="d-flex flex-row justify-content-between" onSubmit={submitHandler}>
                        <Form.Control required placeholder="Enter Zip Code..." value={zip} onChange={changeHandler}/>
                        <Button variant="info" className={`${styles.searchButton} mx-2`} onClick={submitHandler}><BiSearchAlt/></Button>
                        <Button variant="info" className={styles.searchButton} onClick={getUserCoords}><BiCurrentLocation/></Button>
                    </Form>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col md={12} lg={8} xl={8} className="mt-3">
                    <Map
                        //@ts-ignore
                        center={isFocused ? focusedMarker : userCoords}
                    >
                        {userCoords.lat && userCoords.lng ?
                            //@ts-ignore
                            <Marker lat={userCoords.lat} lng={userCoords.lng} color={isZip ? "blue" : "red"}/>
                            :
                            null
                        }

                        {places.length !== 0 ?
                            (places.map((place, index) => {
                                //@ts-ignore
                                let placeCoords = place.geometry.location;
                                //@ts-ignore
                                return <Marker key={index} lat={placeCoords.lat} lng={placeCoords.lng} color="green"/>
                            }))
                            :
                            null
                        }

                        {focusedMarker.lat && focusedMarker.lng ?
                            //@ts-ignore
                            <Marker lat={focusedMarker.lat} lng={focusedMarker.lng} color="purple"/>
                            :
                            null
                        }
                    </Map>
                </Col>

                <Col className="mt-3">
                    <Jumbotron className={`${styles.cardContainer} shadow`}>
                        <Message heading="Recycling Centers">
                            <p>Here you will see a list of nearby recycling centers shown on the map</p>
                            <hr/>
                            <p>Enter a zip code or use your location to get started!</p>
                        </Message>

                        {places.length !== 0 ?
                            (places.map((place, index) => {
                                let dataObj = {     //@ts-ignore
                                    address: place.vicinity,    //@ts-ignore
                                    id: place.place_id,     //@ts-ignore
                                    location: place.geometry.location,      //@ts-ignore
                                    placeName: place.name,      //@ts-ignore
                                    status: place.business_status,
                                }

                                return <PlaceCard data={dataObj} onToggle={focusHandler} key={index}/>;
                            }))
                            :
                            null
                        }
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

const MapPage = () => {
    return(
        <>
            <MetaData title="RecycleIT Map"/>
            <Navigation/>
            <MapPageContent/>
            <Footer/>
        </>
    );
};

export default MapPage;