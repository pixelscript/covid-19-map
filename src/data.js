import _ from 'lodash';
import {NAMES} from './countryCodes';
class Data {
  constructor() {}

  process(data) {
    let header;
    let body;
    let rows = data.split('\n');
    rows.forEach((row, index, arr) => {
      arr[index] = row.split(/,(?=\S)|:/);
    });
    header = rows[0];
    body = rows.splice(1);
    body = this.structure(body);
    body = this.sort(body, ['country', 'province']);
    let {combined, countryCodes} = this.combine(body); body = combined;
    body = this.sort(body, ['total']).reverse();
    console.log({
      header,
      body,
      countryCodes
    })
    return {
      header,
      body,
      countryCodes
    };
  }
  rewriteCountry(country) {
    if(country==="Mainland China"){
      return 'China'
    } else if(country==="US"){
      return 'United States'
    } else if(country==="UK"){
      return 'United Kingdom'
    } else if (country==="South Korea"){
      return 'Korea';
    } else {
      return country;
    }
  }
  sumItems(row) {
    let total = 0;
    for (let i=4; i<row.length; i++) {
      total += Number(row[i]);
    }
    return total;
  }
  sort(data, order) {
    return _.sortBy(data, order);
  }
  structure(data) {
    const organised = [];
    data.forEach(row => {
      const country = this.rewriteCountry(row[1]);
      organised.push({
        country: country,
        countryCode: NAMES[country],
        province: row[0],
        location: {
          lat: row[2],
          long: row[3]
        },
        data: row.slice(4),
        total: Number(row[row.length-1])
      });
    });
    return organised;
  }

  combine(data) {
    let lastCountry = '';
    const countryCodes = [];
    for(let i=0; i<data.length; i++) {
      const row = data[i];
      if (row.country === lastCountry) {
        data[i-1].total += row.total;
        data.splice(i,1);
        i--;
      } else {
        countryCodes.push(row.countryCode);
      }
      lastCountry = row.country;
    };
    return {combined : data, countryCodes};
  }

  async fetch() {
    const data = await this.network();
    return this.process(data);
  }

  async network() {
    const response = await fetch(
      'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
    );
    if (response.ok) {
      const content = await response.text();
      return content;
    }
  }
}

export default new Data();
