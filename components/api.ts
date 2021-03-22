import axios, { AxiosRequestConfig } from 'axios';

const mapsKey: string | undefined = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;
const proxy: string | undefined = process.env.NEXT_PUBLIC_PROXY;

interface IgetPlaceData {
    lat: number | null,
    lng: number | null
}

type zipCode = string;
type placeid = string | string[] | undefined;

const getPlaceData = async (coords: IgetPlaceData) => {
    const dataReqConfig: AxiosRequestConfig = {
        url: `${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        method: "get",
        params: {
            key: mapsKey,
            location: `${coords.lat},${coords.lng}`,
            radius: 16094,
            keyword: "recycling center"
        }, 
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }

    try {
        const req = await axios(dataReqConfig);
        const data = await req.data;

        return data.results;
    } catch(err) {
        console.error(err);
        return null;
    }
}

const getPlaceDataWithZip = async (zip: zipCode) => {
    const geocodeReqConfig: AxiosRequestConfig = {
        url: `${proxy}https://maps.googleapis.com/maps/api/geocode/json`,
        method: "get",
        params: {
            key: mapsKey,
            address: zip
        },
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }

    try {
        const geocodeReq = await axios(geocodeReqConfig);
        const coords = await geocodeReq.data.results[0].geometry.location;
        const data = await getPlaceData(coords);

        return { data, coords };
    } catch(err) {
        console.error(err);
        return null;
    }

}

const getPlaceDetails = async (id: placeid) => {
    const placeDetailsReqConfig: AxiosRequestConfig = {
        url: `${proxy}https://maps.googleapis.com/maps/api/place/details/json`,
        method: "get",
        params: {
            key: mapsKey,
            place_id: id,
            language: "en",
            fields: "name,url,geometry,formatted_phone_number,opening_hours,website,business_status,formatted_address"
        },
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }

    try {
        const placeDetailsReq = await axios(placeDetailsReqConfig);
        const data = await placeDetailsReq.data.result;

        const details = {...data}

        return details;
    } catch(err) {
        console.error(err);
        return null;
    }
}

export { getPlaceData, getPlaceDataWithZip, getPlaceDetails };
