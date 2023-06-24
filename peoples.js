axios.defaults.headers.common['api-key'] = 'PzVzl46a7In0RO91ogWm30YP5Oiu4Lw1'

document.getElementById('search').addEventListener('click', loadOpenData);

let area = document.getElementById('area-input')

loadOpenData();

function loadOpenData() {
    axios
    .get('https://cors-anywhere.herokuapp.com/https://opend.data.go.th/get-ckan/datastore_search?q='+area.value+'&resource_id=225ff892-3874-4072-9787-a2c30128e3f7')
    .then(Response => {
        res = Response.data.result.records;  
        res.sort(function(a, b){
            return a.YYMM - b.YYMM;
        });
        //console.log(res)
        drawgraph(res)
    })
    .catch(err => alert('Error, can not load dataset!'))
}

function drawgraph(res){
    // setup block
    var male = res.map(function(elem){
        return parseFloat(elem.MALE.replace(/,/g,''));
    })
    var female = res.map(function(elem){
        return parseFloat(elem.FEMALE.replace(/,/g,''));
    })
    var test = [], years=[];
    for (i=0;i<res.length;i++){
        test.push('25' + res[i].YYMM);
        years.push(test[i].slice(0,-2))
    }
    let data = {
        labels: years,
        datasets: [{
            label: 'ผู้ชาย',
            data: male,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        },
        {
            label: 'ผู้หญิง',
            data: female,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    }
    // config block
    let config = {
        type: 'bar',
        data,
        options: {
            scales: {
                x:{
                    stacked:false,
                    min: 0,
                    max: 9
                },
                y: {
                    stacked:false,
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
    //scroller
    function scroller(scroll, chart){
        console.log('scroll')
        let dataLenght = myChart.data.labels.length
        if(scroll.deltaY > 0){
            if(myChart.config.options.scales.x.max >= dataLenght){
            myChart.config.options.scales.x.min = dataLenght-10;
            myChart.config.options.scales.x.max = dataLenght;
            }else{myChart.config.options.scales.x.min += 1;myChart.config.options.scales.x.max += 1;}
        } else if (scroll.deltaY < 0){
            if(myChart.config.options.scales.x.min <= 0){
                myChart.config.options.scales.x.min = 0;
                myChart.config.options.scales.x.max = 9;}
            myChart.config.options.scales.x.min -= 1;myChart.config.options.scales.x.max -= 1;
        } else{}
        myChart.update();
    }

    myChart.canvas.addEventListener('wheel', (e) => {
        scroller(e, myChart)
    })
}

function MergeToggle()
{
var t = document.getElementById('MergeButton');
if(t.value=="รวม ชาย/หญิง"){
    myChart.config.options.scales.x.stacked = false;
    myChart.config.options.scales.y.stacked = false;
    t.value="แยก ชาย/หญิง";}
else if(t.value=="แยก ชาย/หญิง"){
    myChart.config.options.scales.x.stacked = true;
    myChart.config.options.scales.y.stacked = true;
    t.value="รวม ชาย/หญิง";}
    myChart.update();
}

function ZoomToggle()
{
    var t = document.getElementById('ZoomButton');
    if(t.value=="ช่วงเวลา 10 ปี"){
        myChart.config.options.scales.x.min = 0;
        myChart.config.options.scales.x.max = 28;
        t.value="ช่วงเวลาทั้งหมด";}
    else if(t.value=="ช่วงเวลาทั้งหมด"){
        myChart.config.options.scales.x.min = 0;
        myChart.config.options.scales.x.max = 9;
        t.value="ช่วงเวลา 10 ปี";}
        myChart.update();
}

//ref https://opendata.data.go.th/dataset/statbyyear





