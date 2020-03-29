<script>
  import * as Pancake from "@sveltejs/pancake";
  import _ from "lodash";
  import {
    selectedCountryCode,
    startDateIndex,
    endDateIndex
  } from "./main.store";
  export let dates = [];
  export let countries = [];
  let x1 = 0;
  let x2 = 0;
  let things = [];
  let data = [];
  let stacks = [];
  let max = 0;
  $: {
    x1 = dates[$startDateIndex].date;
    x2 = dates[$endDateIndex].date;
    let {data, things} = getData();
    data = data.splice(
      $startDateIndex,
      $endDateIndex - $startDateIndex + 1
    );
    if (data.length) {
      stacks = Pancake.stacks(data, things, "date");
      max = sum(data);
    }
  }

  const area = values =>
    values
      .map(d => ({ x: d.i, y: d.end }))
      .concat(values.map(d => ({ x: d.i, y: d.start })).reverse());

  function sum(data) {
    let sum = 0;
    let obj = data[data.length-1];
    Object.keys(obj).forEach(key => {
      if(key!=='date') {
        sum += obj[key]
      }
    })
    return sum;
  }
  function getData() {
    let things = [];
    let data = dates.map((d)=>{
      return {
        date: d.date
      }
    });
    countries.forEach(country => {
      things.push(country.codeA3)
      country.data.forEach((val, index) => {
        data[index][country.codeA3] = val.cases.value;
      });
    });
    return {data, things};
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
  .marker {
    margin-top: -30px;
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
      <div class="x-label">
        {#if value.getDate() === 1}
          <div>|</div>
          <div>{value.getMonth()}</div>
        {:else}
          <div class="marker">|</div>
        {/if}
      </div>
    </Pancake.Grid>

    <Pancake.Svg>
      {#each stacks as s, i}
        <Pancake.SvgPolygon data={area(s.values)} let:d>
          <path
            class="data"
            style="fill: {'rgb('+(Math.random()*255)+', '+(Math.random()*255)+', '+(Math.random()*255)+')'}"
            {d}
            on:click={() => {
              console.log(s.key);
            }} />
        </Pancake.SvgPolygon>
      {/each}
    </Pancake.Svg>
  </Pancake.Chart>
</div>
