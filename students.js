axios.defaults.headers.common['api-key'] = 'PzVzl46a7In0RO91ogWm30YP5Oiu4Lw1'

document.getElementById('search').addEventListener('click', loadOpenData);

let lev_name = document.getElementById('lev-name')

loadOpenData();

function loadOpenData() {
    axios
    .get('https://cors-anywhere.herokuapp.com/https://opend.data.go.th/get-ckan/datastore_search?q='+lev_name.value+'&resource_id=ef5bf8d2-6687-4ad6-97a9-0f3f1d235a7c')
    .then(Response => {
        res = Response.data.result.records;
        res.sort(function( a, b ) {
            return a.GENDER_NAME < b.GENDER_NAME ? -1 : a.GENDER_NAME > b.GENDER_NAME ? 1 : 0;
        });
        //console.log(res)
        drawgraph(res)
    })
    .catch(err => alert('Error, can not load dataset!'))
}

function drawgraph(res){
    // setup block
    var middle = res.length / 2;
    var male = res.slice(0, middle);
    var female = res.slice(middle, res.length);

    var male_stdnum = male.map(function(elem){
        return elem.std_num
    })
    var female_stdnum = female.map(function(elem){
        return elem.std_num
    })

    var ISCED_name = female.map(function(elem){
        return elem.ISCED_BROAD_FIELD_NAME
    })

    let data = {
        labels: ISCED_name,
        datasets: [{
            label: 'ผู้ชาย',
            data: male_stdnum,
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
            data: female_stdnum,
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

//ref https://opendata.data.go.th/dataset/univ_std_11_02