import Link from 'next/link';

import { Card, ListGroup, Button } from 'react-bootstrap';

interface PlaceCardProps{
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
    return(
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{data.placeName}</Card.Title>
            </Card.Body>

            <ListGroup className="list-group-flush">
                <ListGroup.Item>Status: {data.status}</ListGroup.Item>
                <ListGroup.Item>Address: {data.address}</ListGroup.Item>
                <ListGroup.Item>Id: {data.id}</ListGroup.Item>
            </ListGroup>

            <Card.Body className="d-flex flex-row justify-content-around">
                <Link href={`/map/place/${data.id}`}>More Information</Link>
                <Button onClick={(e) => onToggle(e, data.location)} variant="info" className="ml-3">See on Map</Button>
            </Card.Body>
        </Card>
    )
}

export default PlaceCard;