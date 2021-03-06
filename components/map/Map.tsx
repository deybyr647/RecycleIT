import GoogleMap from "google-map-react";
import styles from "../../styles/map.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const mapsKey: string | undefined = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;

export interface Coords {
    lat: number,
    lng: number
};

interface MapProps {
    center: Coords,
    children?: React.ReactNode,
    zoom?: number
};   

interface MarkerProps {
    color: string
}

const Marker = ({color}: MarkerProps) => (
    <FaMapMarkerAlt
        color={color}
        size={36}
        className={styles.marker}
    />
);

const Map = ({center, children, zoom}: MapProps) => {
    const defaultCoords: Coords = {lat: 40.7128, lng: -74.0060};
    const mapOptions = {
        mapTypeControl: true,
        streetViewControl: true
    };

    let isNull = Object.values(center).every(obj => obj === null);
    
    return (
        <div className={`${styles.map} shadow rounded`}>
            <GoogleMap
                //@ts-ignore
                bootstrapURLKeys={{key: mapsKey}}
                defaultCenter={defaultCoords}
                center={isNull ? defaultCoords : center}
                defaultZoom={12}
                zoom={zoom ?? 12}
                options={mapOptions}
                yesIWantToUseGoogleMapApiInternals
            >
                {children}   
            </GoogleMap>
        </div>        
    );
}

export { Marker, Map };