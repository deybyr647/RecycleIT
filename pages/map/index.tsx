import Head from 'next/head';
import { useState } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {BiCurrentLocation, BiSearchAlt, BiStreetView} from 'react-icons/bi';
import GoogleMapReact from 'google-map-react';

import Footer from '../../components/footer';
import Navigation from '../../components/navbar';

const mapsKey: any = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;

interface Coords{
    lat: number,
    lng: number
}

interface GMap{
    center: Coords
    children?: React.ReactNode
}   

interface MapPageContent{
    children: React.ReactNode
}

const GMap = ({center, children}: GMap) => {
    //Creates Google Map
    const defaultCoords: Coords = {lat: 40.7128, lng: -74.0060}; //Defaults to NYC coords
    const mapOptions = {
        mapTypeControl: true,
        streetViewControl: true
    }

    return(
        <div className='shadow' style={{width: "100%", height: "80vh"}}>
            {center.lat && center.lng ? 
                <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
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
                        style={{position:'absolute', transform: 'translate(-50%, -50%)'}}
                    />

                    {children}
                </GoogleMapReact>
                : 
                <GoogleMapReact
                    bootstrapURLKeys={{key: mapsKey, libraries:[]}}
                    defaultCenter={defaultCoords}
                    defaultZoom={11}
                    options={mapOptions}
                >
                </GoogleMapReact>
            }
        </div>
    )
}

const MapPageContent = ({children}: MapPageContent) => {
    const [zip, setZip] = useState('');
    const [userCoords, setUserCoords] = useState({lat: null, lng: null});

    const changeHandler = (e: any): void => {
        //Sets zip code state from form value
        e.preventDefault();

        //@ts-ignore
        setZip(e.target.value);
    }

    const getUserCoords = (e: any): void => {
        //Sets user coordinates as state
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
                    }
                });
            });
        }
    }

    return(
        <Container>
            {children}

            <Row className='mb-2'>
                <Col>
                    <Form className='d-flex flex-row justify-content-between' onSubmit={e => e.preventDefault()}>
                        <Form.Control required type='zip' placeholder='Enter Zip Code...' value={zip} onChange={(e: any) => changeHandler(e)}></Form.Control>
                        <Button type='submit' className='mx-2'><BiSearchAlt/></Button>
                        <Button type='submit' onClick={(e: any) => getUserCoords(e)}><BiCurrentLocation/></Button>
                    </Form>
                </Col>
            </Row>

            <Row className='mt-2'>
                <Col>
                    <GMap
                        //@ts-ignore
                        center={userCoords}
                    />
                </Col>
            </Row>
        </Container>
    )
}

const MapPage = () => {
    return(
        <>
            <Navigation/>
            <MapPageContent>
                <Head>
                    <title>RecycleIT Map</title>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                        crossOrigin="anonymous"
                    />
                </Head>
            </MapPageContent>
            <Footer/>
        </>
    )
}

export default MapPage;