import _ from 'lodash';
class Data {
  constructor() {}

  process(data) {
    const dates = data.series.map(this.formatDate);
    const {countries, totals} = data;
    return {
      countries,
      dates,
      totals
    };
  }

  formatDate(date){
    let da = date.split('/');
    let d = new Date();
    d.setMonth(Number(da[0])-1);
    d.setDate(da[1]);
    d.setYear(String('20' + da[2]));
    return d.toLocaleDateString();
  }

  async fetch() {
    const data = await this.network();
    return this.process(data);
  }

  async network() {
    const response = await fetch('data.json');
    if (response.ok) {
      const content = await response.json();
      return content;
    }
  }
}

export default new Data();
