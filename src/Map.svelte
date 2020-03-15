<script>
  import { draw } from "svelte/transition";
  import { flip } from "svelte/animate";
  import _ from "lodash";
  import {
    type,
    selectedCountryCode,
    highlightCountryCode,
    selectedDateIndex
  } from "./main.store";
  import world from "./world-mill.json";
  import { fade } from "svelte/transition";

  export let body = [];

  const paths = world.paths;
  let countries;
  $: if (body.length && $type && !isNaN($selectedDateIndex)) {
    countries = [];
    Object.keys(paths).forEach(code => {
      const d = _.find(body, { codeA2: code });
      const total = d ? d.data[$selectedDateIndex][$type].value : 0;
      const log = d ? d.data[$selectedDateIndex][$type].logPercent : 0;
      const hasData = d ? true : false;
      countries.push({
        code,
        path: paths[code].path,
        name: paths[code].name,
        color: logToCol(total, log),
        hasData,
        total
      });
    });
  }

  function logToCol(total, log) {
    if (!total) {
      return "hsl(10,0%,70%)";
    }
    return "hsl(10," + log + "%,60%)";
  }
</script>

<style>
  figure {
    margin: 0 0 1em 0;
    text-align: center;
    margin: 0 auto;
    height: 100%;
  }

  svg {
    width: 100%;
    margin: 0 0 1em 0;
    height: 100%;
  }
  figure {
    padding: 10px;
    box-sizing: border-box;
  }
  .radio, .radio-option, .radio label {
    float: left;
    cursor: pointer;
  }
  .radio-option {
    margin: 0.5em;
  }
  .radio {
    position:absolute;
    background: #eee;
  }
  .radio input {
    margin-left:0.5em;
  }
</style>

<figure>
  <div class="radio">
    <div class="radio-option">
      <input type="radio" id="cases" bind:group={$type} name="gender" value="cases" />
      <label for="cases">Cases: </label>
    </div>

    <div class="radio-option">
      <input type="radio" id="deaths" bind:group={$type} name="gender" value="deaths" />
      <label for="deaths">Deaths: </label>
    </div>
    <div class="radio-option">
      <input type="radio" id="recoveries" bind:group={$type} name="gender" value="recoveries" />
      <label for="recoveries">Recoveries: </label>
    </div>
  </div>
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 {world.width}
    {world.height}"
    enable-background="new 0 0 {world.width}
    {world.height}"
    xml:space="preserve">
    <g>
      {#each countries as country (country)}
        <path
          style="cursor: {country.hasData ? 'pointer' : 'normal'}; fill:{country.color};
          stroke:hsl(100,25%,16%); stroke-width: {country.code == $highlightCountryCode || country.code == $selectedCountryCode ? 1 : 0};
          paint-order: fill;"
          d={country.path}
          on:mouseover={() => {
            if (country.hasData) {
              $highlightCountryCode = country.code;
            }
          }}
          on:click={() => {
            if (country.hasData) {
              if ($selectedCountryCode === country.code) {
                $selectedCountryCode = null;
              } else {
                $selectedCountryCode = country.code;
              }
            }
          }}
          on:mouseout={() => {
            if (country.hasData) {
              $highlightCountryCode = null;
            }
          }} />
      {/each}
    </g>
  </svg>
</figure>
