/* eslint-disable */
import request from 'superagent';
import * as apiURL from '../common/apiUrl';

function toFormData(j) {
  const form_data = new FormData();
  for (let key in j) {
      form_data.append(key, j[key]);
  }
  return form_data;
}

export function sendValidatedReport(report) {
  console.log('KEPANGIANIFNAIONSINDASNDNASIDNASINDINDSANDASI');
  console.log(`${localStorage.getItem('auth')};${localStorage.getItem('refresh')}`);
  console.log(report);
  return new Promise((resolve, reject) => {
    const rep = toFormData(report);
    request.post('https://api.jalanaman.ga/report/post')
    .set('Auth', `${localStorage.getItem('auth')};${localStorage.getItem('refresh')}`)
    .send(rep)
    .end((err, res) => {
      if (err) {
        console.log('ERROR SEND REPORT: ', err);
      } else {
        const result = JSON.parse(res.text);
        console.log(result);
        if (result.status == 200) {
          console.log('BERHASIL3 HORE: ', result);
        } else {
          // pass
        }
      }
      resolve();
    });
  });
}
