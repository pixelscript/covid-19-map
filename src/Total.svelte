<script>
  import { selectedDateIndex } from "./main.store";
  import Chart from "./Chart.svelte";
  export let body;
  let totalCases;
  $: totalCases = calcTotal($selectedDateIndex, "cases");
  let totalRecoveries;
  $: totalRecoveries = calcTotal($selectedDateIndex, "recoveries");
  let totalDeaths;
  $: totalDeaths = calcTotal($selectedDateIndex, "deaths");
  const calcTotal = (index, dim) => {
    let total = 0;
    body.forEach(country => {
      total += country.data[index][dim].value;
    });
    return total;
  };
</script>

<style>
  .total {
    border: 1px solid #aaa;
    display: block;
    text-align: center;
    padding: 0.5em;
    margin-top: -4.5em;
    font-size: 2em;
    margin-left: 1em;
    height: 2.5em;
    width: 4em;
    background: rgba(185, 174, 174, 0.5);
    line-height: 3em;
    color: #333;
  }
  .title {
    font-size: 0.5em;
    line-height: 0.5em;
    text-decoration: underline;
  }
  .value {
    font-size: 1em;
    line-height: 2.5em;
  }

  .chart {
    display: block;
    text-align: center;
    margin-top: -11em;
    font-size: 2em;
    margin-left: 1em;
    height: 5em;
    width: 5em;
    line-height: 3em;

  }
</style>

<span class="total">
  <div class="title">Total Cases</div>
  <div class="value">{totalCases.toLocaleString()}</div>
</span>

<span>
  <div class="chart">
    <Chart
      cases={totalCases}
      recoveries={totalRecoveries}
      deaths={totalDeaths} />
  </div>
</span>
