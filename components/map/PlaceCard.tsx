import { Card, ListGroup, Button } from "react-bootstrap";

import styles from "../../styles/map.module.css";

interface PlaceCardProps {
    data: {
        address: string,
        id: string,
        location: {
            lat: number,
            lng: number
        }
        placeName: string,
        status: string,
    },
    onToggle: Function
}

const PlaceCard = ({onToggle, data}: PlaceCardProps) => {

    const clickHandler = (e: any) => {
        e.preventDefault();
        onToggle(e, data.location);
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{data.placeName}</Card.Title>
            </Card.Body>

            <ListGroup className="list-group-flush">
                <ListGroup.Item>Status: {data.status}</ListGroup.Item>
                <ListGroup.Item>Address: {data.address}</ListGroup.Item>
            </ListGroup>

            <Card.Body className="d-flex flex-row justify-content-around">
                <Card.Link 
                    className={`${styles.searchButton} btn btn-info`}
                    href={`/map/place/${data.id}`}
                >
                    More Information
                </Card.Link>

                <Button 
                    onClick={clickHandler} 
                    variant="info" 
                    className={`ml-3 ${styles.searchButton}`}
                >
                    See on Map
                </Button>

            </Card.Body>
        </Card>
    )
}

export default PlaceCard;
