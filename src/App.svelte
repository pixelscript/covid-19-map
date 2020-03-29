<script>
  import Bars from "./Bars.svelte";
  import Header from "./Header.svelte";
  import Map from "./Map.svelte";
  import Table from "./Table.svelte";
  import Total from "./Total.svelte";
  import Slider from "./Slider.svelte";
  import data from "./data";
  import { nav } from "./main.store";

  let view = "map";
</script>

<style>
  :global(body, html) {
    /* this will apply to <body> */
    height: 100%;
  }

  :global(*) {
    font-family: "Roboto", sans-serif;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0fr 0fr 0fr 0fr 1fr 2.7em;
    grid-template-areas: "header" "map" "total" "slider" "table" "footer";
    height: 100%;
    font-size: 0.8em;
  }

  @media (min-aspect-ratio: 4/3) {
    .grid-container {
      display: grid;
      grid-template-columns: 1.4fr 0.6fr;
      grid-template-rows: 0fr 1fr 0fr 0fr 2.7em;
      grid-template-areas: "header header" "map table" "total table" "slider table" "footer footer";
    }

    .map {
      margin-top: 2px;
    }
  }

  @media (max-width: 1000px) {
    .grid-container {
      font-size: 0.7em;
    }
  }

  @media (max-width: 800px) {
    .grid-container {
      font-size: 0.6em;
    }
  }

  @media (max-width: 600px) {
    .grid-container {
      font-size: 0.5em;
    }
  }

  .bars {
    grid-template-columns: 1fr;
    grid-template-rows: 0fr 1fr 0fr 2.7em;
    grid-template-areas: "header" "map" "slider" "footer";
  }

  .bars .map {
    overflow-x: scroll;
  }
  .header {
    grid-area: header;
    background: #b99a9a;
  }
  span {
    text-align: center;
    margin: 0;
    padding: 0.5em;
    font-size: 0.8em;
    width: 100%;
    box-sizing: border-box;
    background: #eee;
    color: #aaa;
    display: inline-block;
  }

  a {
    color: #999;
    text-decoration: underline;
  }

  .slider {
    grid-area: slider;
  }

  .total {
    grid-area: total;
  }

  .map {
    grid-area: map;
    background: #eee;
  }

  .table {
    grid-area: table;
    overflow: scroll;
  }

  footer {
    grid-area: footer;
    overflow: scroll;
  }
</style>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
    rel="stylesheet" />
</svelte:head>

{#await data.fetch() then data}
  <main class="grid-container {($nav === 'map'?'':'bars')}">
    <div class="header">
      <Header countries={data.countries} />
    </div>
    <div class="map">
      {#if ($nav === 'map')}
        <Map body={data.countries} />
      {:else}
        <Bars countries={data.countries} />
      {/if}
    </div>
    {#if ($nav === 'map')}
    <div class="total">
      <Total totals={data.totals} countries={data.countries} />
    </div>
    {/if}
    <div class="slider">
      <Slider dates={data.dates} />
    </div>
    {#if ($nav === 'map')}
    <div class="table">
      <Table
        body={data.countries} />
    </div>
    {/if}
    <footer>
      <span>
        Data source:
        <a href="https://github.com/CSSEGISandData/COVID-19">
          https://github.com/CSSEGISandData/COVID-19
        </a>
        | Made By:
        <a href="http://www.pixelscript.net/">pixelscript</a>
        | Source:
        <a href="https://github.com/pixelscript/covid-19-map">
          https://github.com/pixelscript/covid-19-map
        </a>
      </span>
    </footer>
  </main>
{/await}
