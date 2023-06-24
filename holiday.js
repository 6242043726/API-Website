axios.defaults.headers.common['X-IBM-Client-id'] = 'ff023c09-37b8-422b-b2e1-a148ae0b6be0'

document.getElementById('search').addEventListener('click', loadHoliday);

let holidayApi = 'https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/?year='
let yearThai = document.getElementById('year-input')

loadHoliday();

function loadHoliday(){
  let yearInput = parseInt(yearThai.value) - parseInt(543);
  axios
  .get(holidayApi + yearInput)
  .then(Response => {
    res = Response.data.result.data;
    //console.log(res);
    let html = '';
    res.forEach(res => {
      html += `
      <tr>
      <td>
      ${res.DateThai}
      </td>
      <td>
      ${res.HolidayDescriptionThai}
      </td>
      </tr>
      `;
    });
    document.getElementById('tbody').innerHTML = html
  })
  .catch(err => alert('Error, can not load dataset!'))
}

//ref https://apiportal.bot.or.th/bot/public/node/104