// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig } from 'axios';

const mapsKey = process.env.GOOGLEMAPS_API_KEY;

const api = async (req: NextApiRequest, res: NextApiResponse) => {
    const {lat, lng, zip} = req.query;

    const nearbySearchConfig: AxiosRequestConfig = {
        url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        method: "get",
        params: {
            key: mapsKey,
            location: null,
            radius: 16094,
            keyword: "recycling center"
        },
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }

    const geocodeConfig: AxiosRequestConfig = {
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        method: "get",
        params: {
            key: mapsKey,
            address: null
        },
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }

    if (lat && lng) {
        nearbySearchConfig.params.location = `${lat},${lng}`
        const nearbySearch = await axios(nearbySearchConfig);
        const data = await nearbySearch.data.results;

        res.status(200).json([...data]);
    } else if (zip) {
        geocodeConfig.params.address = zip;
        const geocode = await axios(geocodeConfig);
        const coords = await geocode.data.results[0].geometry.location;

        nearbySearchConfig.params.location = `${coords.lat},${coords.lng}`;
        const nearbySearch = await axios(nearbySearchConfig);
        const data = nearbySearch.data.results;
        res.status(200).json({data, coords});
    }
}

export default api;