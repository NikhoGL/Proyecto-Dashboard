async function dummyChart(){
    await getDommyData()


const ctx = document.getElementById('chart');
// const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
// const temp = [-20, -10, 0, 10, 20, 30, 40 ]
const Ciudadlabel = [],
    temperaturaCiudadData = [],
    temperaturaDiariaData = []


    const grafico = new Chart(ctx,{
        type:'line',
        data: {
            labels: Ciudadlabel,
            datasets: [{
                label:'days',
                data: temp,
                backgroundColor: [
                    pattern.draw('square', '#ff6384'),
                    pattern.draw('circle', '#36a2eb'),
                    pattern.draw('diamond', '#cc65fe'),
                    pattern.draw('triangle', '#ffce56')
                ],
            
            labels: ['Red', 'Blue', 'Purple', 'Yellow']
        

            }]
        }
    })
}

    option: {
        tooltips:{
            mode:'index'
        }
    }
    dummyChart ()

    async function getDommyData(){

        const key = `4qbGPzASID43xCjCcoTsoVYALcrB9Bbe` 
        const api = `http://dataservice.accuweather.com/currentconditions/v1/`

        const response = await fetch(api)
        const barChartData = await response.json()

        const ciudad = barChartData.data.map((x) => x.temperatura_Ciudad)
        const temp = barChartData.data.map((x) => x.temperatura_temp)
        const days = barChartData.data.map((x) => x.temperatura_days)
    
    
    console.log(ciudad, temp, days)

    Ciudadlabel = ciudad
    temperaturaCiudadData = temp
    temperaturaDiariaData = days
    }
    getDommyData ()
