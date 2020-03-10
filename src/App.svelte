<script>
  import Map from "./Map.svelte";
  import Table from "./Table.svelte";
  import Slider from "./Slider.svelte";
  import data from "./data";
</script>

<style>
	:global(body, html) {
		/* this will apply to <body> */
		height:100%;
	}

  :global(*) {
    font-family: 'Roboto', sans-serif;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0fr 0fr 0fr 1fr 0fr;
    grid-template-areas: "header" "map" "slider" "table" "footer";
		height:100%;
  }


  h1, span {
    grid-area: header;
    text-align:center;
    margin:0;
    padding:0.5em;
    background: #b99a9a;
    color: white;
    font-size:1.5em;
  }
  span {
    font-size: 0.8em;
    width:100%;
    box-sizing: border-box;
    background: #eee;
    color: #AAA;
    display: inline-block;
  }

  a {
    color: #AAA;
    text-decoration: none;
  }

  .slider {
    grid-area: slider;
  }

  .map {
    grid-area: map;
		background: #eee;
  }

  .table {
    grid-area: table;
		overflow: scroll;
  }

  .footer {
    grid-area: footer;
		overflow: scroll;
  }
</style>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</svelte:head>

{#await data.fetch() then data}
<main class="grid-container">
  <h1 class="header">Confirmed COVID-19 Cases over time</h1>
  <div class="map">
    <Map body="{data.body}" countryCodes="{data.countryCodes}" />
  </div>
  <div class="slider">
    <Slider dates="{data.dates}"/>
  </div>
  <div class="table">
    <Table class="table" body="{data.body}" countryCodes="{data.countryCodes}"  />
  </div>
  <footer>
    <span>Data source: <a href="https://github.com/CSSEGISandData/COVID-19">https://github.com/CSSEGISandData/COVID-19</a></span>
  </footer>
</main>
{/await}