<script>
  import { draw } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { selectedCountryCode } from './main.store';
  import world from "./world-mill.json";

  export let data = [];
  export let countryCodes = [];

  const paths = world.paths;
  const countries = [];
  Object.keys(world.paths).forEach((code)=>{
    countries.push({
      code
    })
  })

  $: countryCodes.length ? countries = countries : false;

  const codeToCol = (code) => {
    console.log(code, countryCodes.length);
    if (countryCodes.indexOf(code) !== -1) {
      return "hsl(100,50%,60%)";
    } else {
      return "hsl(100,0%,60%)";
    }
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
    cursor: pointer;
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
          style="fill:{codeToCol(country.code)}; stroke:red; stroke-width: {country.code == $selectedCountryCode ? 1 : 0}; paint-order: fill;"
          d={paths[country.code].path}
          on:mouseover={() => {
            selectedCountryCode.set(country.code);
          }}
          on:mouseout={() => {
            selectedCountryCode.set('');
          }}
          on:click={() => console.log('hi', paths[country.code].name, codeToCol(country.code))} />
      {/each}
    </g>
  </svg>
</figure>