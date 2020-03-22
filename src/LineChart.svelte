<script>
  import * as Pancake from "@sveltejs/pancake";
  import _ from 'lodash';
  import {pop} from './populations'
  import {selectedCountryCode, startDateIndex, endDateIndex } from "./main.store";
  export let dates = [];
  export let totals = [];
  export let countries = [];
  let x1 = 0;
  let x2 = 0;
  const things = ["cases", "deaths", "recoveries"];
  const colors = ["rgb(200, 200, 200)","hsl(10, 100%, 60%)","#85ed85"];
  let data = [];
  let stacks = [];
  let max = 0;
  let country = {};
  $: {
    x1 = dates[$startDateIndex].date
    x2 = dates[$endDateIndex].date;
    if(countries && $selectedCountryCode) {
      country = findCountry($selectedCountryCode);
    }
    data = getData().splice($startDateIndex,$endDateIndex-$startDateIndex+1);
    if(data.length) {
      stacks = Pancake.stacks(data, things, "date");
      max = data[data.length -1].cases + data[data.length -1].deaths + data[data.length -1].recoveries;
    }
  }

  const area = values =>
    values
      .map(d => ({ x: d.i, y: d.end }))
      .concat(values.map(d => ({ x: d.i, y: d.start })).reverse());

  function getData() {
    if($selectedCountryCode) {
      return country.data.map(composeTwo);
    } else {
      return totals.map(compose);
    }
  }

  function findCountry(code) {
    return _.find(countries, { codeA2: code });
  }

  function composeTwo(val, index){
    let {cases,deaths,recoveries} = val;
    let date = dates[index].date;
    return {
      date,
      cases: (cases.value-deaths.value-recoveries.value)/pop[country.codeA3],
      deaths: deaths.value/pop[country.codeA3],
      recoveries: recoveries.value/pop[country.codeA3]
    }
  }

  function compose(val, index){
    let {cases,deaths,recoveries} = val;
    let date = dates[index].date;
    return {
      date,
      cases: cases-deaths-recoveries,
      deaths,
      recoveries
    }
  }
</script>

<style>
  .chart {
    height: calc(100% - 130px);
    padding: 4em 4em 4em 4em;
    overflow: hidden;
  }

  .grid-line {
    position: relative;
    display: block;
  }

  .grid-line.horizontal {
    width: calc(100% + 2em);
    left: -2em;
    border-bottom: 1px dashed #ccc;
  }

  .grid-line.first {
    border-bottom: 1px solid #333;
  }

  .grid-line span {
    position: absolute;
    left: 0;
    bottom: 2px;
    font-family: sans-serif;
    font-size: 14px;
    color: #999;
  }

  .x-label {
    position: absolute;
    width: 4em;
    left: -2em;
    bottom: -22px;
    font-family: sans-serif;
    font-size: 14px;
    color: #999;
    text-align: center;
  }

  path.data {
    stroke: none;
  }

</style>
<div class="chart">
  <Pancake.Chart {x1} {x2} y1={0} y2={max}>
    <Pancake.Grid horizontal count={5} let:value let:first>
      <div class="grid-line horizontal" class:first>
        <span>{value.toLocaleString()}</span>
      </div>
    </Pancake.Grid>

    <Pancake.Grid vertical ticks={data.map(d => d.date)} let:value>
      <span class="x-label">{value.getDate()}</span>
    </Pancake.Grid>

    <Pancake.Svg>
      {#each stacks as s, i}
        <Pancake.SvgPolygon data={area(s.values)} let:d>
          <path class="data" style="fill: {colors[i]}" {d} />
        </Pancake.SvgPolygon>
      {/each}
    </Pancake.Svg>
  </Pancake.Chart>
</div>
