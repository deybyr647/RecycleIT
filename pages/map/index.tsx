import { useEffect, useState } from "react";
import GoogleMap from "google-map-react";
import axios, { AxiosRequestConfig } from "axios";

import { Container, Row, Col, Form, Button, Alert, Jumbotron } from "react-bootstrap";
import { BiCurrentLocation, BiSearchAlt } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "../../styles/map.module.css";

import MetaData from "../../components/metadata";
import Navigation from "../../components/navbar";
import Footer from "../../components/footer";

import testData from "./test.json";
const mapsKey: string | undefined = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;
const proxy: string = "https://cors-anywhere.herokuapp.com/";

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

const LandingMessage = () => {
    const [alert, setAlert] = useState(true);

    return(
        <Alert variant="info" show={alert} dismissible onClose={() => setAlert(false)}>
            <Alert.Heading>Welcome To The Map</Alert.Heading>
            <p>
                Here you can see location and other information of recycling centers!
                You can also see your saved recycling centers for convenience!
            </p>
            <hr/>
            <p>Enter a zip code or use your current location to get started searching...</p>
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
        <div className={`${styles.map} shadow`}>
            <GoogleMap
                //@ts-ignore
                bootstrapURLKeys={{key: mapsKey, libraries: ["geometry", "drawing"]}}
                onGoogleApiLoaded={({map, maps}) => {console.log(map, maps)}}
                defaultCenter={defaultCoords}
                center={isNull ? defaultCoords : center}
                defaultZoom={11}
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
    const [userCoords, setUserCoords] = useState({lat: null, lng: null});
    const [places, setPlaces] = useState([]);
    const [zipStatus, setZipStatus] = useState(false)

    const changeHandler = (e: any): void => {
        e.preventDefault();
        setZip(e.target.value);
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        getPlaceCoordsWithZip();
        setZip("");
    }

    const getPlaceCoordsWithUserCoords = async () => {
        const placesRequestConfig: AxiosRequestConfig = {
            url: `${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            method: "get",
            params: {
                key: mapsKey,
                location: `${userCoords.lat},${userCoords.lng}`,
                radius: 32187,
                keyword: "recycling center"
            }
        }

        let placesRequest = await axios(placesRequestConfig);
        setPlaces(placesRequest.data.results);
    }

    const getPlaceCoordsWithZip = async () => {
        const geocodeRequestConfig: AxiosRequestConfig = {
            url:`${proxy}https://maps.googleapis.com/maps/api/geocode/json`,
            method: "get",
            params: {
                key: mapsKey,
                address: zip
            }
        }

        let geocodeRequest = await axios(geocodeRequestConfig);
        let geocodedResult = geocodeRequest.data.results[0].geometry.location;

        const placesRequestConfig: AxiosRequestConfig = {
            url: `${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            method: "get",
            params: {
                key: mapsKey,
                location: `${geocodedResult.lat}, ${geocodedResult.lng}`,
                radius: 32187,
                keyword: "recycling center"
            }
        }
        
        setZipStatus(true);

        setUserCoords((prev: any) => {
            return {
                ...prev,
                lat: geocodedResult.lat,
                lng: geocodedResult.lng
            }
        });

        let placesRequest = await axios(placesRequestConfig);
        setPlaces(placesRequest.data.results);
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

                setZipStatus(false);
            });
        };
    };

    useEffect(() => {
        getPlaceCoordsWithUserCoords();
    }, [userCoords]);

    return(
        <Container fluid>
            <Row className="mb-2">
                <Col>
                    <Form className="d-flex flex-row justify-content-between" onSubmit={submitHandler}>
                        <Form.Control required placeholder="Enter Zip Code..." value={zip} onChange={changeHandler}/>
                        <Button variant="info" type="submit" className={`${styles.searchButton} mx-2`} onClick={submitHandler}><BiSearchAlt/></Button>
                        <Button variant="info" type="submit" className={styles.searchButton} onClick={getUserCoords}><BiCurrentLocation/></Button>
                    </Form>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col md={12} lg={8} xl={8} className="mt-3">
                    <LandingMessage/>

                    <Map
                        //@ts-ignore
                        center={userCoords}
                    >
                        {userCoords.lat && userCoords.lng ?
                            //@ts-ignore
                            <Marker lat={userCoords.lat} lng={userCoords.lng} color={zipStatus ? "blue" : "red"}/>
                            :
                            null
                        }

                        {places.map((place, index) => {
                            //@ts-ignore
                            let placeCoords = place.geometry.location;
                            //@ts-ignore
                            return <Marker key={index} lat={placeCoords.lat} lng={placeCoords.lng} color="green"/>
                        })}
                    </Map>
                </Col>

                <Col className="mt-3">
                    <Jumbotron className="h-100">
                        <h1 className="text-center">Place List</h1>
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