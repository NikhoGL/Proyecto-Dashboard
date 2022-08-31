const inputCity = document.querySelector(`form`);
const card = document.querySelector(`.card`)
const datos= document.querySelector(`.datos`)
const time = document.querySelector(`img.time`)
const icon = document.querySelector(`.icon img`)


const updateUI = (data) => {

    console.log(data);

    const cityDatos = data.cityDatos;
    const weather = data.weather;

    datos.innerHTML = `
    <h5 class="my-3">${cityDatos.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

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
    
    return {
        cityDatos,
        weather
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
