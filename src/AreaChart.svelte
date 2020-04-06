<script>
  import * as Pancake from "@sveltejs/pancake";
  import {onMount} from "svelte";
  import {pop} from './populations'
  import _ from "lodash";
  import {
    selectedCountryCode,
    startDateIndex,
    endDateIndex
  } from "./main.store";
  export let dates = [];
  export let countries = [];
  let visible = false;
  let ccode = "USA";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let percentage = false;
  let x = 0;
  let y = 0;
  let chart;
  onMount(()=>{
    chart.addEventListener('mousemove',(e)=>{
      x = e.clientX + 10;
      y = e.clientY + 10;
    })
  });
  $: all = getData(countries) || percentage;
  $: things = all.things;
  $: data = all.data;
  $: x1 = dates[$startDateIndex].date;
  $: x2 = dates[$endDateIndex].date;
  $: newData = data.slice($startDateIndex, $endDateIndex + 1);
  $: stacks = newData.length ? Pancake.stacks(newData, things, "date") : [];
  $: max = sum(newData);

  const area = values =>
    values
      .map(d => ({ x: d.i, y: d.end }))
      .concat(values.map(d => ({ x: d.i, y: d.start })).reverse());

  function mouseOver(e, code) {
    ccode = code;
    visible = true;
  }
  function mouseOut(e) {
    visible = false;
  }
  function colorFromString(str) {
    const r = Math.floor(((str.charCodeAt(0)-65)/25)*256);
    const g = Math.floor(((str.charCodeAt(1)-65)/25)*256);
    const b = Math.floor(((str.charCodeAt(2)-65)/25)*256);
    return `rgb(${r}, ${g}, ${b})`;
  }
  function sum(data) {
    let sum = 0;
    let obj = data[data.length - 1];
    Object.keys(obj).forEach(key => {
      if (key !== "date") {
        sum += obj[key];
      }
    });
    return sum;
  }
  function getData(countries) {
    let things = [];
    let data = dates.map(d => {
      return {
        date: d.date
      };
    });
    countries.forEach(country => {
      things.push(country.codeA3);
      country.data.forEach((val, index) => {
        let v
        if(percentage) {
          v = pop[country.codeA3] ? (val.cases.value / pop[country.codeA3])*100 : 0;
        } else {
          v = val.cases.value;
        }
        data[index][country.codeA3] = v;
      });
    });
    return { data, things };
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

  .hover {
    position:fixed;
    z-index:1;
    background:white;
    padding:10px;
    font-weight:bold;
  }
</style>
<input type="checkbox" bind:checked={percentage}/> {percentage}
{#if visible}
<div class="hover" style="left: {x}px; top:{y}px;ˆ">{ccode}</div>
{/if}
<div class="chart" bind:this="{chart}">
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
          <div>{months[value.getMonth()]}</div>
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
            style="fill: {colorFromString(s.key)};"
            {d}
            on:mouseout={mouseOut}
            on:mouseover={(e)=>{mouseOver(e,s.key)}} />
        </Pancake.SvgPolygon>
      {/each}
    </Pancake.Svg>
  </Pancake.Chart>
</div>
