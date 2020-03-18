<script>
  import {
    searchFilter,
    highlightCountryCode,
    selectedDateIndex,
    selectedCountryCode,
    type
  } from "./main.store";
  import { slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { pop } from "./populations";
  import _ from "lodash";
  export let countries;
  let cntCopy = _.cloneDeep(countries);
  const length = cntCopy[0].data.length - 1;
  let max = 0;
  type.subscribe(() => {
    sort(cntCopy, length);
    max = percent(cntCopy[0].data[length][$type].value, pop[cntCopy[0].codeA3]);
    cntCopy.forEach((country, i, cnts) => {
      if (country.codeA3 === "NONE") {
        cnts.splice(i, 1);
        return;
      }
    });
    sort(cntCopy, $selectedDateIndex);
    cntCopy = cntCopy;
  });

  $: {
    sort(cntCopy, $selectedDateIndex);
    cntCopy = cntCopy;
  }

  function percent(fraction, whole) {
    return (fraction / whole) * 100;
  }
  function sort(cnts, index) {
    cntCopy.sort((one, two) => {
      const a = percent(one.data[index][$type].value, pop[one.codeA3]);
      const b = percent(two.data[index][$type].value, pop[two.codeA3]);
      return a < b ? 1 : -1;
    });
  }

  function getClasses(code) {
    const classes = [];
    if (code === $highlightCountryCode) {
      classes.push("highlighted");
    }
    if (code === $selectedCountryCode) {
      classes.push("selected");
    }
    return classes.join(" ");
  }
</script>

<style>
  .name {
    line-height: 1.5em;
    padding: 0 0 0 1%;
    width: 18%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name,
  .value {
    display: inline-block;
    box-sizing: border-box;
  }
  .row:nth-child(odd) {
    background: rgb(228, 228, 228);
  }
  .value {
    background: rgb(128, 0, 0);
    height: 1.5em;
    /* transition: width 0.05s ease-in-out; */
    border-bottom: 1px solid white;
    border-left: 1px solid white;
  }
  .row {
    clear: both;
    box-sizing: border-box;
    height: 1.5em;
    border-bottom: 1px solid white;
    cursor:pointer;
  }
  h1 {
    padding: 0.5em;
    margin: 0;
    height: 1.5em;
    line-height: 1.5em;
    background: white;
    color: #666;
    border-bottom: 1px solid #888;
  }
  .chart {
    width: 100%;
    height: 100%;
  }
  .percent {
    width: 10%;
    padding: 0 0 0 5px;
  }

  .radio,
  .radio-option,
  .radio label {
    float: left;
    height: 1.5em;
    line-height: 1.5em;
    padding: 0.5em;
  }
  .radio label {
    cursor: pointer;
  }
  .radio-option {
    margin: 0 0.2em;
  }
  .radio {
    float: right;
    padding: 0.5em;
  }

  .selected {
    background: #ffc8c4 !important;
  }

  .radio input {
    margin: 0;
    margin-left: 0.5em;
    height: 1.5em;
    line-height: 1.5em;
  }
</style>

<div class="chart">
  <div class="radio">
    <div class="radio-option">
      <input
        type="radio"
        id="cases"
        bind:group={$type}
        name="gender"
        value="cases" />
      <label for="cases">Cases:</label>
    </div>

    <div class="radio-option">
      <input
        type="radio"
        id="deaths"
        bind:group={$type}
        name="gender"
        value="deaths" />
      <label for="deaths">Deaths:</label>
    </div>
    <div class="radio-option">
      <input
        type="radio"
        id="recoveries"
        bind:group={$type}
        name="gender"
        value="recoveries" />
      <label for="recoveries">Recoveries:</label>
    </div>
  </div>
  <h1>
    {$type.charAt(0).toUpperCase() + $type.slice(1).toLowerCase()} as a
    percentage of the population
  </h1>
  {#each cntCopy as country, i (country.codeA3)}
    <div
      class="row {getClasses(country.codeA2, $highlightCountryCode, $selectedCountryCode)}"
      on:mouseover={() => {
        $highlightCountryCode = country.codeA2;
      }}
      on:click={() => {
        if ($selectedCountryCode === country.codeA2) {
          $selectedCountryCode = null;
        } else {
          $selectedCountryCode = country.codeA2;
        }
      }}>
      <div class="name">{country.name}</div>
      <div
        class="value"
        style="width:{(percent(country.data[$selectedDateIndex][$type].value, pop[country.codeA3]) / max) * 70}%" />
      <div class="name percent">
        {percent(country.data[$selectedDateIndex][$type].value, pop[country.codeA3]).toPrecision(1)}%
        ({country.data[$selectedDateIndex][$type].value.toLocaleString()})
      </div>
    </div>
  {/each}
</div>
