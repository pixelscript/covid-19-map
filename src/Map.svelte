<script>
  import { draw } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import _ from 'lodash';
  import { selectedCountryCode } from './main.store';
  import world from "./world-mill.json";

  export let body = [];
  export let countryCodes = [];

  const paths = world.paths;
  let countries = [];
  
  $: if (body.length && countryCodes.length) {
    Object.keys(paths).forEach((code)=>{
      const d =  _.find(body, {code});
      const total = d ? d.total : 0;
      const log = d ? d.log : 0;
      const hasData = d ? true : false;
      countries.push({
        code,
        path: paths[code].path,
        name: paths[code].name,
        color: logToCol(hasData,log),
        hasData,
        total
      })
    });
    countries = countries;
  }

  function logToCol(hasData,log){
    if(!hasData) {
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
    max-height:100%;
    max-width:1400px;
  }

  svg {
    width: 100%;
    margin: 0 0 1em 0;
  }
  path {
    /* cursor: pointer; */
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
      {#each countries as country}
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
              selectedCountryCode.set('');
            }
          }}
          on:click={() => console.log('hi', country.name, country.total)} />
      {/each}
    </g>
  </svg>
</figure>