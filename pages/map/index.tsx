import { useState } from "react";
import GoogleMapReact from "google-map-react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BiCurrentLocation, BiSearchAlt, BiStreetView } from "react-icons/bi";

import MetaData from "../../components/metadata";
import Navigation from "../../components/navbar";
import Footer from "../../components/footer";

const mapsKey: string | undefined = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;

interface Coords {
    lat: number,
    lng: number
};

interface GMapProps {
    center: Coords
    children?: React.ReactNode
};   

const GMap = ({center, children}: GMapProps) => {
    const defaultCoords: Coords = {lat: 40.7128, lng: -74.0060};
    const mapOptions = {
        mapTypeControl: true,
        streetViewControl: true
    };

    return(
        <div className="shadow" style={{width: "100%", height: "80vh"}}>
            {center.lat && center.lng ? 
                <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
                    //@ts-ignore
                    bootstrapURLKeys={{key: mapsKey, libraries:[]}}
                    defaultCenter={defaultCoords}
                    center={center}
                    defaultZoom={11}
                    options={mapOptions}
                >
                    <BiStreetView
                        //@ts-ignore
                        lat={center.lat}
                        lng={center.lng}
                        text="Marker"
                        size={26}
                        style={{position:"absolute", transform: "translate(-50%, -50%)"}}
                    />

                    {children}
                </GoogleMapReact>
                : 
                <GoogleMapReact
                    //@ts-ignore
                    bootstrapURLKeys={{key: mapsKey, libraries:[]}}
                    defaultCenter={defaultCoords}
                    defaultZoom={11}
                    options={mapOptions}
                >
                </GoogleMapReact>
            }
        </div>
    );
}

const MapPageContent = () => {
    const [zip, setZip] = useState("");
    const [userCoords, setUserCoords] = useState({lat: null, lng: null});

    const changeHandler = (e: any): void => {
        e.preventDefault();
        console.log(zip);
        setZip(e.target.value);
    };

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
            });
        };
    };

    return(
        <Container>
            <Row className="mb-2">
                <Col>
                    <Form className="d-flex flex-row justify-content-between" onSubmit={e => e.preventDefault()}>
                        <Form.Control required placeholder="Enter Zip Code..." value={zip} onChange={changeHandler}/>
                        <Button type="submit" className="mx-2"><BiSearchAlt/></Button>
                        <Button type="submit" onClick={getUserCoords}><BiCurrentLocation/></Button>
                    </Form>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col>
                    <GMap
                        //@ts-ignore
                        center={userCoords}
                    />
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