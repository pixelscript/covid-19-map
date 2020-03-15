<script>
  import {
    searchFilter,
    highlightCountryCode,
    selectedDateIndex,
    selectedCountryCode
  } from "./main.store";
  export let countries;
  let max = countries[0].data[countries[0].data.length-1].cases.value;
</script>

<style>
  .name {
    width: 19%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-right:1px solid white;
  }
  .name, .value {
    display: inline-block;
  }
  .row:nth-child(odd) {
    background: rgb(228, 228, 228);
  }
  .value {
    background: rgb(128, 0, 0);
    height: 1em;
    transition: width 0.1s ease-in-out;
  }
  .row {
    clear:both;
  }
  .chart {
    width:100%;
    height: 100%;
  }
</style>

<div class="chart">
  {#each countries as country, i}
  <div class="row">
    <div class="name">{country.name}</div>
    <div class="value" style="width:{(country.data[$selectedDateIndex].cases.value / countries[0].data[countries[0].data.length-1].cases.value)*80}%"></div>
  </div>
  {/each}
</div>
