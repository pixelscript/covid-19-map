<script>
  export let cases;
  export let deaths;
  export let recoveries;
  let total, casePercent, deathPercent, recoveryPercent;
  $: {
    total = cases + deaths + recoveries;
    casePercent = ((cases / total) * 100);
    deathPercent = ((deaths / total) * 100);
    recoveryPercent = ((recoveries / total) * 100);
  }
</script>

<style>
  .chart {
    text-align: center;
  }
  .label {
    font-size: 0.45em;
    line-height: 1.2em;
    float: right;
  }
  .key {
    clear: both;
    height: 0.5em;
    margin-top: -0.8em;
    vertical-align: middle;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  .key-color {
    width: 0.5em;
    height: 0.5em;
    float: left;
  }
  .cases {
    background: rgb(200, 200, 200);
  }
  .deaths {
    background: hsl(10, 100%, 60%);
  }
  .recoveries {
    background: #85ed85;
  }
</style>

<div class="chart">
  <svg height="20" width="20" viewBox="0 0 20 20">
    <circle r="10" cx="10" cy="10" fill="white" />
    <circle
      r="5"
      cx="10"
      cy="10"
      fill="transparent"
      stroke="#85ed85"
      stroke-width="10"
      stroke-dasharray="{(casePercent + deathPercent + recoveryPercent) * 31.4 / 100} 31.4"
      transform="rotate(-90) translate(-20)" />
    <circle
      r="5"
      cx="10"
      cy="10"
      fill="transparent"
      stroke="hsl(10,100%,60%)"
      stroke-width="10"
      stroke-dasharray="{(casePercent + deathPercent) * 31.4 / 100} 31.4"
      transform="rotate(-90) translate(-20)" />
    <circle
      r="5"
      cx="10"
      cy="10"
      fill="transparent"
      stroke="#d3cecf"
      stroke-width="10"
      stroke-dasharray="{casePercent * 31.4 / 100} 31.4"
      transform="rotate(-90) translate(-20)" />
    <circle r="5" cx="10" cy="10" stroke="#aaa" fill="#eee" stroke-width="0.1"/>
    <circle r="9.95" cx="10" cy="10" stroke="#bbb" fill="transparent" stroke-width="0.1"/>

  </svg>
  <div class="key">
    <div class="key-color cases" />
    <div class="label">Cases ({casePercent.toFixed(1)}%)</div>
  </div>
  <div class="key">
    <div class="key-color deaths" />
    <div class="label">Deaths ({deathPercent.toFixed(1)}%)</div>
  </div>
  <div class="key">
    <div class="key-color recoveries" />
    <div class="label">Recoveries ({recoveryPercent.toFixed(1)}%)</div>
  </div>
</div>
