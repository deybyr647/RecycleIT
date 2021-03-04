import axios, { AxiosRequestConfig } from 'axios';

const mapsKey: string | undefined = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;
const proxy: string = "https://cors-anywhere.herokuapp.com/";

interface IgetPlaceData {
    lat: number | null,
    lng: number | null
}

type zipCode = string;

const getPlaceData = async (coords: IgetPlaceData) => {
    const dataReqConfig: AxiosRequestConfig = {
        url: `${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        method: "get",
        params: {
            key: mapsKey,
            location: `${coords.lat},${coords.lng}`,
            radius: 16094,
            keyword: "recycling center"
        }
    }

    try {
        let req = await axios(dataReqConfig);
        let data = await req.data;
        return data.results;
    } catch(err) {
        if(err) console.error(err);
    }
}

const getPlaceDataWithZip = async (zip: zipCode) => {
    const geocodeReqConfig: AxiosRequestConfig = {
        url: `${proxy}https://maps.googleapis.com/maps/api/geocode/json`,
        method: "get",
        params: {
            key: mapsKey,
            address: zip
        }
    }

    try {
        let geocodeReq = await axios(geocodeReqConfig);
        let coords = await geocodeReq.data.results[0].geometry.location;

        let data = await getPlaceData(coords);
        return { data, coords };
    } catch(err) {
        if(err) console.error(err);
    }

}

export { getPlaceData, getPlaceDataWithZip };