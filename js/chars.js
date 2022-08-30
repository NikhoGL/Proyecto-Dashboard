const ctx = document.getElementById('chart');
const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
const temp = [-20, -10, 0, 10, 20, 30, 40 ]
const Ciudadlabel = []
    temperaturaCiudad = []
    temperaturaDiaria = []


    const grafico = new Chart(ctx,{
        type:'line',
        data: {
            labels: temp,
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

    async function getDommyData(){

        const api = `http://dataservice.accuweather.com/currentconditions/v1/`

        const response = await fetch(api)
        const barChartData = await response.json()

        const ciudad = barChartData.data.map((x) => x.temperatura_Ciudad)
        const temp = barChartData.data.map((x) => x.temperatura_temp)
        const days = barChartData.data.map((x) => x.temperatura_days)
    
    
    console.log(ciudad, temp, days)

    Ciudadlabel = ciudad
    temperaturaCiudad = temp
    temperaturaDiaria = days
    }
    getDommyData ()