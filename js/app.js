const card = document.querySelector(`.card`)
const datos= document.querySelector(`.datos`)
const time = document.querySelector(`img.time`)
const icon = document.querySelector(`.icon img`)
const details = document.querySelector('#details');
const ctx = document.querySelector('#myChart').getContext('2d');


import {getCity, getWeather, getWeatherDays} from "./forecast.js"               


const updateUI = (data) => {

    const cityDatos = data.cityDatos;
    const weather = data.weather;
    const weatherDays = data.weatherDays;


    let realFeel = (weather.RealFeelTemperature.Metric.Value * 100) / 50;

    datos.innerHTML = `
    <h5 class="my-3">${cityDatos.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;


    function CrearGraphic() {

        const tempMax = {
            label: `Temperatura (°C) máxima de los próximos 5 días`,
            data: [`${weatherDays.DailyForecasts[0].Temperature.Maximum.Value}`, `${weatherDays.DailyForecasts[1].Temperature.Maximum.Value}`, `${weatherDays.DailyForecasts[2].Temperature.Maximum.Value}`, `${weatherDays.DailyForecasts[3].Temperature.Maximum.Value}`, `${weatherDays.DailyForecasts[4].Temperature.Maximum.Value}`, `${weatherDays.DailyForecasts[0].Temperature.Minimum}`],
            backgroundColor: 'red',
            borderColor:'red',
            borderWidth: 1
        }

        const tempMin = {
            label: `Temperatura (°C) mínima de los próximos 5 días`,
            data: [`${weatherDays.DailyForecasts[0].Temperature.Minimum.Value}`, `${weatherDays.DailyForecasts[1].Temperature.Minimum.Value}`, `${weatherDays.DailyForecasts[2].Temperature.Minimum.Value}`, `${weatherDays.DailyForecasts[3].Temperature.Minimum.Value}`, `${weatherDays.DailyForecasts[4].Temperature.Minimum.Value}`],
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1
        }

        window.grafica = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['24 Hrs', '48 Hrs', '72 Hrs', '96 Hrs', '120 Hrs'],
                datasets: [tempMax, tempMin]
            },
        })  
    }

    if(window.grafica) {
        window.grafica.clear();
        window.grafica.destroy();
        CrearGraphic();
    } else {
        CrearGraphic();
    }

    details.innerHTML = `
        <div class="my-3 pt-4 d-flex justify-content-start">
            <h4 class="text-dark fs-6">Más detalles sobre el tiempo del día de Hoy</h4>
        </div>
        <div class="row gap-3 mb-3">
            <div class="col bg-white rounded">
                <div class="m-3">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-center align-items-center">
                            <h3 class="text-dark fs-6 m-0">Humedad</h3>
                        </div>
                        <div class="div-icon">
                            <i class="fa-solid fa-droplet"></i>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <p class="text-dark fs-5 m-0 pe-1 fw-bold">${weather.RelativeHumidity}%</p>
                    </div>
                    <div class="d-flex align-items-center justify-content-center flex-column mt-3">
                        <div class="custom-box-bar">
                            <p class="percentages" style="color: rgb(212, 211, 211);">1%</p>
                            <p class="percentages" style="color: rgb(212, 211, 211);">50%</p>
                            <p class="percentages" style="color: rgb(212, 211, 211);">100%</p>
                        </div>
                        <div class="bar">
                            <div class="percentage" style="--w:${weather.RelativeHumidity}%"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col bg-white rounded">
                <div class="m-3">
                    <div class="d-flex justify-content-between">
                        <h3 class="text-dark fs-6 m-0">Viento</h3>
                        <div class="div-icon">
                            <i class="fa-solid fa-wind"></i>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <p class="text-dark fs-5 m-0 pe-1 fw-bold">${weather.Wind.Speed.Metric.Value} km/h</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row gap-3">
            <div class="col bg-white rounded">
                <div class="m-3">
                    <div class="d-flex justify-content-between">
                        <h3 class="text-dark fs-6 m-0">Indice UV</h3>
                        <div class="div-icon">
                            <i class="fa-solid fa-sun"></i>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <p class="text-dark fs-5 m-0 pe-2 fw-bold">${weather.UVIndex}</p>
                        <p class="text-dark m-0 fs-5">${weather.UVIndexText}</p>
                    </div>
                </div>
            </div>
            <div class="col bg-white rounded">
                <div class="m-3">
                    <div class="d-flex justify-content-between">
                        <h3 class="text-dark fs-6 m-0">Sensación Térmica</h3>
                        <div class="div-icon">
                            <i class="fa-solid fa-temperature-empty"></i>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <p class="text-dark fs-5 m-0 pe-2 fw-bold">${weather.RealFeelTemperature.Metric.Value}°C</p>
                        <p class="text-dark m-0 fs-5">${weather.RealFeelTemperature.Metric.Phrase}</p>
                    </div>
                    <div class="d-flex align-items-center justify-content-center flex-column mt-3">
                        <div class="custom-box-bar">
                            <p class="percentages" style="color: rgb(212, 211, 211);">0°</p>
                            <p class="percentages" style="color: rgb(212, 211, 211);">25°</p>
                            <p class="percentages" style="color: rgb(212, 211, 211);">50°</p>
                        </div>
                        <div class="bar">
                            <div class="percentage" style="--w:${realFeel}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    const iconDay = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute(`src`, iconDay)

    let timeDay = null;
        if(weather.IsDayTime){
            timeDay = `img/day.jpg`;
        }else{
            timeDay = `img/night.jpg`
        }
    
    time.setAttribute(`src`, timeDay);

    if(card.classList.contains(`d-none`)){
        card.classList.remove(`d-none`)
    }   
}


const updateCity = async (city)=>{

    const cityDatos = await getCity(city);
    const weather = await getWeather(cityDatos.Key);
    const weatherDays = await getWeatherDays(cityDatos.Key);
    
    return {
        cityDatos,
        weather,
        weatherDays
    }
};


inputCity.addEventListener(`submit`,  e=>{
    e.preventDefault();
    
    const city = inputCity.city.value.trim();
    inputCity.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});