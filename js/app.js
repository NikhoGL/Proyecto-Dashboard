const inputCity = document.querySelector(`form`);
const card = document.querySelector(`.card`)
const datos= document.querySelector(`.datos`)
const time = document.querySelector(`img.time`)
const icon = document.querySelector(`.icon img`)
const details = document.querySelector('#details');


const updateUI = (data) => {

    console.log(data);

    const cityDatos = data.cityDatos;
    const weather = data.weather;

    let realFeel = (weather.RealFeelTemperature.Metric.Value * 100) / 50;

    datos.innerHTML = `
    <h5 class="my-3">${cityDatos.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

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
            <div class="col bg-white rounded">
                <div class="m-3">
                    <div class="d-flex justify-content-between">
                        <h3 class="text-dark fs-6 m-0">Precipitaciones</h3>
                        <div class="div-icon">
                            <i class="fa-solid fa-cloud-showers-heavy"></i>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <p class="text-dark fs-5 m-0 pe-1 fw-bold">${weather.PrecipitationSummary.Precipitation.Metric.Value} mm</p>
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
            <div class="col bg-white rounded">
                <div class="m-3">
                    <div class="d-flex justify-content-between">
                        <h3 class="text-dark fs-6 m-0">Visibilidad</h3>
                        <div class="div-icon">
                            <i class="fa-solid fa-eye"></i>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <p class="text-dark fs-5 m-0 pe-1 fw-bold">${weather.Visibility.Metric.Value} km</p>
                    </div>
                </div>
            </div>
        </div>
    `

    const iconDay = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute(`src`, iconDay)

    let timeDay = null;
        if(weather.IsDayTime){
            timeDay = `img/day.svg`;
        }else{
            timeDay = `img/night.svg`
        }
    
    time.setAttribute(`src`, timeDay);


    if(card.classList.contains(`d-none`)){
        card.classList.remove(`d-none`)
    }   
}


const updateCity = async (city)=>{

    const cityDatos = await getCity(city);
    const weather = await getWeather(cityDatos.Key);
    
    return {
        cityDatos,
        weather,
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

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});