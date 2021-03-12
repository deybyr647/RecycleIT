import { useEffect, useState } from "react";

import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import styles from "../../styles/map.module.css";

import MetaData from "../../components/Metadata";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import { Marker, Map, Coords } from "../../components/map/Map";
import Message from "../../components/map/Message";
import PlaceCard from "../../components/map/PlaceCard";
import Searchbar from '../../components/map/Searchbar';

import { getPlaceData, getPlaceDataWithZip } from "../../components/api";

const MapPageContent = () => {
    const [zip, setZip] = useState("");
    const [isZip, setIsZip] = useState(false);

    const [userCoords, setUserCoords] = useState({lat: null, lng: null});
    const [focusedMarker, setFocusedMarker] = useState({lat: null, lng: null});
    
    const [isFocused, setIsFocused] = useState(false);
    const [places, setPlaces] = useState([]);
    
    const onZipCodeChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setZip(e.currentTarget.value);
    };

    const onPlaceFocus = (coords: Coords): void => {
        setFocusedMarker((prev: any) => {
            return {
                ...prev,
                lat: coords.lat,
                lng: coords.lng
            }
        });

        setIsFocused(true);
        document.documentElement.scrollTop = 0;
    }

    const formSubmitHandler = (): void => {
        (async () => {
            let placeData = await getPlaceDataWithZip(zip);
            setPlaces(placeData?.data);

            setUserCoords((prev: any) => {
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

        setFocusedMarker((prev: any) => {
            return {
                ...prev,
                lat: null,
                lng: null
            }
        });
    }

    const getUserCoords = (): void => {
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

                setFocusedMarker((prev: any) => {
                    return {
                        ...prev,
                        lat: null,
                        lng: null
                    }
                });
            });
        }
    };

    useEffect(() => {
        (async () => {
            let placeData = await getPlaceData(userCoords);
            setPlaces(placeData);
        })();
    }, [userCoords]);

    return (
        <Container fluid>
            <Row className="mb-2">
                <Col>
                    <Searchbar
                        formSubmitAction={formSubmitHandler}
                        formChangeAction={onZipCodeChange}
                        onClickAction={getUserCoords}
                        formValue={zip}
                    />
                </Col>
            </Row>

            <Row className="mt-2">
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