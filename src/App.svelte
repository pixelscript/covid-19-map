<script>
  import Map from "./Map.svelte";
  import Table from "./Table.svelte";
  import data from "./data";
  import { ISO, NAMES } from "./countryCodes";
  import _ from "lodash";
  let header = [];
  let body = [];
  let countryCodes = [];
  (async () => {
    const {header, body, countryCodes} = await data.fetch();
  })();
</script>

<style>
	:global(body, html) {
		/* this will apply to <body> */
		height:100%;
	}

  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "map" "table";
		height:100%;
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

<main class="grid-container">
  <div class="map">
    <Map {body} {countryCodes}/>
  </div>
  <div class="table">
    <Table class="table" {body} />
  </div>
</main>
