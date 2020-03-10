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
    grid-template-rows: 0fr 1fr;
    grid-template-areas: "header" "map" "slider" "table";
		height:100%;
  }


  .header {
    grid-area: header;
    text-align:center;
    margin:0;
    padding:0.5em;
    background: #b99a9a;
    color: white;
    font-size:1.5em;
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
</main>
{/await}