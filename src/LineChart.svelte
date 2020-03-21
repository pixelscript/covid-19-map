<script>
  import * as Pancake from "@sveltejs/pancake";
  import _ from 'lodash';
  import {selectedCountryCode } from "./main.store";
  export let dates = [];
  export let totals = [];
  export let countries = [];
  const x1 = dates[0].date;
  const x2 = dates[dates.length-1].date;
  const things = ["cases", "deaths", "recoveries"];
  const colors = ["rgb(200, 200, 200)","hsl(10, 100%, 60%)","#85ed85"];
  let data = [];
  let stacks = [];
  let max = 0;
  $: {
    $selectedCountryCode;
    data = getData();
    stacks = Pancake.stacks(data, things, "date");
    max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map(v => v.end)), 0);
  }

  const area = values =>
    values
      .map(d => ({ x: d.i, y: d.end }))
      .concat(values.map(d => ({ x: d.i, y: d.start })).reverse());

  function getData() {
    if($selectedCountryCode) {
      return findCountry($selectedCountryCode).data.map(composeTwo);
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
      cases: cases.value-deaths.value-recoveries.value,
      deaths: deaths.value,
      recoveries: recoveries.value
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
    height: calc(100% - 100px);
    padding: 4em 4em 4em 4em;
    margin: 0 0 36px 0;
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
