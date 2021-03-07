import { useEffect, useState } from "react";

import { Container, Row, Col, Form, Button, Jumbotron } from "react-bootstrap";
import { BiCurrentLocation, BiSearchAlt } from "react-icons/bi";
import styles from "../../styles/map.module.css";

import MetaData from "../../components/Metadata";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import { Marker, Map, Coords} from "../../components/map/Map";
import Message from "../../components/map/Message";
import PlaceCard from "../../components/map/PlaceCard";

import { getPlaceData, getPlaceDataWithZip } from "../../components/api";

const MapPageContent = () => {
    const [zip, setZip] = useState("");
    const [isZip, setIsZip] = useState(false);

    const [userCoords, setUserCoords] = useState({lat: null, lng: null});
    const [focusedMarker, setFocusedMarker] = useState({lat: null, lng: null});
    
    const [isFocused, setIsFocused] = useState(false);
    const [places, setPlaces] = useState([]);
    
    const onZipCodeChange = (e: any): void => {
        e.preventDefault();
        setZip(e.target.value);
    };

    const onPlaceFocus = (e: any, coords: Coords) => {
        e.preventDefault();
        setFocusedMarker((prev: any) => {
            return {
                ...prev,
                lat: coords.lat,
                lng: coords.lng
            }
        });

        setIsFocused(true);

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        
        (async () => {
            let placeData = await getPlaceDataWithZip(zip);
            setPlaces(placeData?.data);

            setUserCoords(prev => {
                return {
                    ...prev,                                
                    lat: placeData?.coords.lat,              
                    lng: placeData?.coords.lng
                }
            });
        })();

        setIsZip(true);
        setIsFocused(false);
        setZip("");
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
                    <Form 
                        className="d-flex flex-row justify-content-between" 
                        onSubmit={submitHandler}
                    >
                        <Form.Control
                            required
                            placeholder="Enter Zip Code..." 
                            value={zip} 
                            onChange={onZipCodeChange}
                        />

                        <Button 
                            variant="info" 
                            className={`${styles.searchButton} mx-2`} 
                            onClick={submitHandler}
                        >
                            <BiSearchAlt/>
                        </Button>

                        <Button 
                            variant="info" 
                            className={styles.searchButton} 
                            onClick={getUserCoords}
                        >
                            <BiCurrentLocation/>
                        </Button>
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
                            <Marker /* @ts-ignore */
                                lat={userCoords.lat}
                                lng={userCoords.lng}
                                color={isZip ? "blue" : "red"}
                            />
                            :
                            null
                        }

                        {places.length !== 0 ?
                            (places.map((place, index) => {
                                //@ts-ignore
                                let placeCoords = place.geometry.location;
                                
                                return (
                                    <Marker 
                                        key={index} //@ts-ignore
                                        lat={placeCoords.lat}
                                        lng={placeCoords.lng}
                                        color="green"
                                    />
                                );
                            }))
                            :
                            null
                        }

                        {focusedMarker.lat && focusedMarker.lng ?
                            
                            <Marker /* @ts-ignore */
                                lat={focusedMarker.lat}
                                lng={focusedMarker.lng}
                                color="purple"
                            />
                            :
                            null
                        }
                    </Map>
                </Col>

                <Col className="mt-3">
                    <Jumbotron className={`${styles.cardContainer} shadow`}>
                        <Message heading="Recycling Centers">
                            <p>
                                Here you will see a list of nearby recycling 
                                centers shown on the map
                            </p>
                            <hr/>
                            <p>
                                Enter a zip code or use your 
                                location to get started!
                            </p>
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

                                return (
                                    <PlaceCard
                                        data={dataObj}
                                        onToggle={onPlaceFocus}
                                        key={index}
                                    />
                                );
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
    return (
        <>
            <MetaData title="RecycleIT Map"/>
            <Navigation/>
            <MapPageContent/>
            <Footer/>
        </>
    );
};

export default MapPage;