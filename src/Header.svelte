<script>
  import _ from "lodash";
  import {
    searchFilter,
    highlightCountryCode,
    selectedDateIndex,
    selectedCountryCode,
    nav
  } from "./main.store";
  export let countries;
  let country;
  $: {
    country = _.find(countries, { codeA2: $selectedCountryCode });
  }
  import Chip from "./Chip.svelte";
</script>

<style>
  .head {
    color: white;
    display: inline-block;
    height: 3em;
    min-height: 3em;
    box-sizing: border-box;
    display: block;
  }
  h1,
  h2,
  input {
    margin: 0;
    padding: 0;
    font-size: 1.5em;
    line-height: 1.5em;
    padding: 0.25em;
    float: left;
    background: #b99a9a;
    color: white;
    border-right: 1px solid white;
    padding-right: 0.5em;
  }
  h2,
  input {
    font-size: 1.25em;
    padding: 0.45em;
    margin-left: 0.5em;
    font-weight: normal;
    border: 0;
  }
  input {
    float: right;
    background: white;
    border: 0.1em solid #b99a9a;
    color: #333;
    margin: 0;
    box-sizing: border-box;
    line-height: 1.3em;
    width:20%;
  }
  button {
    position: fixed;
    right: 0.4em;
    top: 0.4em;
  }
  @media (min-aspect-ratio: 4/3) {
    input {
      width: 30%;
    }
  }

  @media (max-width: 600px) {
    input {
      width:18%;
    }
  }
  @media (max-width: 500px) {
    button {
      display:none;
    }
  }

  ul, li {
    list-style:none;
    padding:0;
    margin: 0;
    float:left;
    background: #999;
  }
  li {
    padding: 0 1em;
    height: 3em;
    line-height: 3em;
    border-right: 1px solid white;
    cursor:pointer;
  }

  li.selected {
    background: #52657c;
  }

  @media (max-width: 500px) {
    .label {
      display:none;
    }
  }
</style>

<div class="head">
  <h1>😷COVID-19 Map</h1>
  <ul>
    <li class="{$nav=='map' ? 'selected' : ''}" on:click="{()=>{$nav='map'}}"><span class="label">Map </span>🌍</li>
    <li class="{$nav=='chart' ? 'selected' : ''}" on:click="{()=>{$nav='chart'}}"><span class="label">Chart </span>📊</li>
  </ul>
  {#if $selectedCountryCode}
    <h2>Chosen:</h2>
    <Chip
      {country}
      on:removed={() => {
        $selectedCountryCode = null;
      }} />
  {/if}
  <input placeholder="search" bind:value={$searchFilter} />
  <button
    type="button"
    on:click={() => {
      $searchFilter = '';
    }}>
    clear
  </button>
</div>
