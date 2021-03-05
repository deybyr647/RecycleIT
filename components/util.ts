import axios, { AxiosRequestConfig } from 'axios';

const mapsKey: string | undefined = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY;
const proxy: string = "https://cors-anywhere.herokuapp.com/";

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
        }
    }

    try {
        const req = await axios(dataReqConfig);
        const data = await req.data;

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
        const geocodeReq = await axios(geocodeReqConfig);
        const coords = await geocodeReq.data.results[0].geometry.location;
        const data = await getPlaceData(coords);

        return { data, coords };
    } catch(err) {
        if(err) console.error(err);
    }

}

const getPlaceDetails = async (id: placeid) => {
    const placeDetailsReqConfig: AxiosRequestConfig = {
        url: `https://maps.googleapis.com/maps/api/place/details/json`,
        method: "get",
        params: {
            key: mapsKey,
            place_id: id?.toString(),
            language: "en",
            fields: "name,photo,url,geometry,formatted_phone_number,opening_hours,website,business_status,formatted_address"
        }
    }

    try {
        const placeDetailsReq = await axios(placeDetailsReqConfig);
        const data = await placeDetailsReq.data;

        return {
            status: data.result.business_status,
            address: data.result.formatted_address,
            phoneNumber: data.result.formatted_phone_number,
            coords: data.result.geometry.location,
            name: data.result.name,
            isOpen: data.result.opening_hours.open_now,
            schedule: data.result.opening_hours.weekday_text,
            url: data.result.url,
            website: data.result.website
        }
    } catch(err) {
        if(err) console.error(err);
        return null;
    }
}

export { getPlaceData, getPlaceDataWithZip, getPlaceDetails };