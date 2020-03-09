<script>
  import { draw } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { selectedCountryCode } from './main.store';
  import world from "./world-mill.json";

  export let data = [];
  export let countryCodes = [];;
  
  const paths = world.paths;
  const countries = Object.keys(world.paths);
  const hash = (str) => {
    let hash = 0;
    let chr;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash * 31) + chr;
      hash |= 0;
    }
    return hash;
  };
  const hashToCol = (hash) => {
    return Math.floor((hash/2147483647)*360);
  }

  const color = (val) => {
    // return "hsl(" + val + ",50%,60%)";
    return "hsl(100,50%,60%)";
  };

  const nameToCol = (name) => {
    return color(hashToCol(hash(name)));
  }

  const codeToCol = (code) => {
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
          style="fill:{codeToCol(paths[country].countryCode)}; stroke:red; stroke-width: {country == $selectedCountryCode ? 1 : 0}; paint-order: fill;"
          d={paths[country].path}
          on:mouseover={() => {
            selectedCountryCode.set(country);
          }}
          on:mouseout={() => {
            selectedCountryCode.set('');
          }}
          on:click={() => console.log('hi', paths[country].name)} />
      {/each}
    </g>
  </svg>
</figure>