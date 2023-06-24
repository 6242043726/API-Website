axios.defaults.headers.common['X-IBM-Client-id'] = 'ff023c09-37b8-422b-b2e1-a148ae0b6be0'

document.getElementById('exchange').addEventListener('click', loadExchange);
document.getElementById('viewCName').addEventListener('click', loadCName);

let end_period = document.getElementById('year-input')
let currency = document.getElementById('currency-input')

loadExchange();

function loadExchange(){
    let start_period = parseInt(end_period.value)-parseInt(9)
    axios
    .get('https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/ANNUAL_AVG_EXG_RATE/?start_period=' +start_period+'&end_period='+end_period.value+'&currency='+currency.value)
    .then(Response => {
        res = Response.data.result.data.data_detail;
        res.sort(function(a, b){
            return a.period - b.period;
        });
        //console.log(res);
        drawgraph(res);
    })
    .catch(err => alert('Error, can not load dataset!'))
}

function drawgraph(res){
    // setup block
    var years = res.map(function(elem){
        return elem.period;
    })
    var buy = res.map(function(elem){
        return elem.buying_transfer;
    })
    var sell = res.map(function(elem){
        return elem.selling;
    })
    console.log(years)
    let data = {
        labels: years,
        datasets: [{
            label: 'Buying Rate',
            data: buy,
            backgroundColor: 'transparent',
            borderColor: 'red',
            borderWidth: 4,
        },
        {
            label: 'Selling Rate',
            data: sell,
            backgroundColor: 'transparent',
            borderColor: 'green',
            borderWidth: 4,
        }]
    }
    // config block
    let config = {
        type: 'line',
        data,
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            },
        }
    }
    // init block
    if(myChart instanceof Chart)
                        {
                            myChart.destroy();
                        }
    myChart = new Chart(document.getElementById('myChart'),
    config);
}

function loadCName(){
    axios
    .get('https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/ANNUAL_AVG_EXG_RATE/?start_period=2021&end_period=2021')
    .then(Response => {
        res = Response.data.result.data.data_detail;
        let html = '';
        res.forEach(res => {
            html += `
            <li>
            ${res.currency_name_th}
            </li>
            `;
          });
          document.getElementById('CName').innerHTML = html
    })
}

//ref https://apiportal.bot.or.th/bot/public/node/503