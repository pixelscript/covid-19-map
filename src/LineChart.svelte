<script>
  import _ from "lodash";
  import * as Pancake from "@sveltejs/pancake";
  import {
    selectedCountryCode,
    startDateIndex,
    endDateIndex
  } from "./main.store";
  export let dates = [];
  export let countries = [];
  let newCountries = [];
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  $: {
    $startDateIndex, $endDateIndex;
    newCountries = countries.map(country => {
      return {
        name: country.name,
        data: country.data
          .map((d, i) => ({
            x: dates[i].date.getTime(),
            y: d.cases.value
          }))
          .splice($startDateIndex, $endDateIndex - $startDateIndex + 1)
      };
    });
    newCountries.splice(0,1);
    x1 = +Infinity;
    x2 = -Infinity;
    y1 = +Infinity;
    y2 = -Infinity;

    newCountries.forEach(country => {
      country.data.forEach(d => {
        if (d.x < x1) x1 = d.x;
        if (d.x > x2) x2 = d.x;
        if (d.y < y1) y1 = d.y;
        if (d.y > y2) y2 = d.y;
      });
    });
  }
  let closest;
  let filter = "";
  let points = [];
  $: regex = filter ? new RegExp(filter, "i") : null;
  $: filtered = regex
    ? newCountries.filter(country => regex.test(country.name))
    : newCountries;

  $: {
    points = filtered.reduce((points, country) => {
      return points.concat(
        country.data.map(d => ({
          x: d.x,
          y: d.y,
          country
        }))
      );
    }, []);
    console.log(points);
  }
</script>

<style>
  .chart {
    height: calc(100% - 10em);
    margin: 2em;
  }

  input {
    font-size: inherit;
    font-family: inherit;
    padding: 0.5em;
  }

  .grid-line {
    position: relative;
    display: block;
  }

  .grid-line.horizontal {
    width: calc(100% +-2em);
    left: -2em;
    border-bottom: 1px dashed #ccc;
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
    stroke: rgba(0, 0, 0, 0.2);
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 1px;
    fill: none;
  }

  .highlight {
    stroke: #ff3e00;
    fill: none;
    stroke-width: 2;
  }

  .annotation {
    position: absolute;
    white-space: nowrap;
    bottom: 1em;
    line-height: 1.2;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.2em 0.4em;
    border-radius: 2px;
  }

  .annotation-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #ff3e00;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .annotation strong {
    display: block;
    font-size: 20px;
  }

  .annotation span {
    display: block;
    font-size: 14px;
  }
</style>

<input placeholder="Type to filter" bind:value={filter} />

<div class="chart">
  <Pancake.Chart {x1} {x2} {y1} {y2}>
    <Pancake.Grid horizontal count={5} let:value>
      <div class="grid-line horizontal">
        <span>{value}</span>
      </div>
    </Pancake.Grid>

    <Pancake.Grid vertical count={5} let:value>
      <span class="x-label">{value}</span>
    </Pancake.Grid>

    <Pancake.Svg>
      {#each filtered as country}
        <Pancake.SvgLine data={country.data} let:d>
          <path class="data" {d} />
        </Pancake.SvgLine>
      {/each}

      {#if closest}
        <Pancake.SvgLine data={closest.country.data} let:d>
          <path class="highlight" {d} />
        </Pancake.SvgLine>
      {/if}
    </Pancake.Svg>

    {#if closest}
      <Pancake.Point x={closest.x} y={closest.y}>
        <span class="annotation-point" />
        <div
          class="annotation"
          style="transform: translate(-{100 * ((closest.x - x1) / (x2 - x1))}%,0)">
          <strong>{closest.country.name}</strong>
          <span>{closest.x}: {closest.y} years</span>
        </div>
      </Pancake.Point>
    {/if}

    <Pancake.Quadtree data={points} bind:closest />
  </Pancake.Chart>
</div>
