<script>
  import { draw } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import _ from 'lodash';
  import { selectedCountryCode, selectedDateIndex } from './main.store';
  import world from "./world-mill.json";
  import { fade } from 'svelte/transition';

  export let body = [];
  export let countryCodes = [];

  const paths = world.paths;
  let countries;
  $: if (body.length && countryCodes.length && !isNaN($selectedDateIndex)) {
    countries= [];
    Object.keys(paths).forEach((code)=>{
      const d =  _.find(body, {code});
      const total = d ? d.data[$selectedDateIndex].value : 0;
      const log = d ? d.data[$selectedDateIndex].log : 0;
      const hasData = d ? true : false;
      countries.push({
        code,
        path: paths[code].path,
        name: paths[code].name,
        color: logToCol(total,log),
        hasData,
        total
      })
    });
    countries = countries;
  }

  function logToCol(total,log){
    if(!total) {
      return "hsl(10,0%,70%)";
    }
    return "hsl(10,"+ log +"%,60%)";
  }
</script>

<style>
  figure {
    margin: 0 0 1em 0;
    text-align: center;
    margin: 0 auto;
    height:100%;
  }

  svg {
    width: 100%;
    margin: 0 0 1em 0;
    height:100%;
  }
  figure {
    padding: 10px;
    box-sizing: border-box;
  }
</style>

<figure>
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
          style="cursor: {country.hasData ? 'pointer' : 'normal'}; fill:{country.color}; stroke:hsl(100,25%,16%); stroke-width: {country.code == $selectedCountryCode ? 1 : 0}; paint-order: fill;"
          d={country.path}
          on:mouseover={() => {
            if(country.hasData) {
              selectedCountryCode.set(country.code);
            }
          }}
          on:mouseout={() => {
            if(country.hasData) {
              selectedCountryCode.set(null);
            }
          }}
        />
      {/each}
    </g>
  </svg>
</figure>