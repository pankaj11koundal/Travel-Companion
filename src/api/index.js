import axios from 'axios';

export const getPlacesData = async (type, bounds) => {
    const options = {
        params: {
            bl_latitude: bounds.sw.lat,
            bl_longitude: bounds.sw.lng,
            tr_longitude: bounds.ne.lng, 
            tr_latitude: bounds.ne.lat,
        },
        headers: {
            'X-RapidAPI-Key': '10e81db1damsh9eaed7d8b331119p10c40ejsn461c1e52a157',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, options);
        return data;
    } catch (error) {
        conosle.log(error);
    }
} 

export const getWeatherData = async (coordinates) => {
    try {
        // const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=a4bc054ab4fe13fd5e909e30ff1e6db1`)
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY}`)
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
