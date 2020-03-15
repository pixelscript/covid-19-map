<script>
  import { selectedDateIndex, selectedCountryCode } from "./main.store";
  import Chart from "./Chart.svelte";
  import _ from "lodash";
  export let totals;
  export let countries;
  let total;
  $: {
    if ($selectedCountryCode) {
      const country = _.find(countries, { codeA2: $selectedCountryCode });
      total = {
        cases: country.data[$selectedDateIndex].cases.value,
        deaths: country.data[$selectedDateIndex].deaths.value,
        recoveries: country.data[$selectedDateIndex].recoveries.value
      };
    } else {
      total = totals[$selectedDateIndex];
    }
  }
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

  @media (max-width: 800px) and (min-aspect-ratio: 4/3) {
    .chart {
      display:none;
    }
  }
  @media (max-width: 800px) {
    .chart {
      width: 4em;
      margin-top: -10em;
    }
  }

  @media (max-width: 500px) {
    .chart {
      display:none;
    }
  }
</style>

<span class="total">
  <div class="title">
    {#if $selectedCountryCode}Selected{:else}Total{/if}
    Cases
  </div>
  <div class="value">{total.cases.toLocaleString()}</div>
</span>

<span>
  <div class="chart">
    <Chart
      cases={total.cases}
      recoveries={total.recoveries}
      deaths={total.deaths} />
  </div>
</span>
