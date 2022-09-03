const key = `4qbGPzASID43xCjCcoTsoVYALcrB9Bbe`

const getWeather = async (id) => {
     
    const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${id}?apikey=${key}&language=es&details=true`;

    const response = await fetch(base + query);
    const data = await response.json();
    
    return data[0];
}

const getWeatherDays = async (id) => {

    const base = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
    const query = `${id}?apikey=${key}&language=es&details=true&metric=true`;

    const response = await fetch(base + query);
    const data = await response.json();
    
    return data;
}

const getCity = async (city) => {
    
    const base = `http://dataservice.accuweather.com/locations/v1/cities/search`;
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

   return data[0];
}

export {getCity, getWeatherDays, getWeather}