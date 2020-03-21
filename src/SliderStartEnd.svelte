<script>
  import { startDateIndex, endDateIndex } from "./main.store";
  export let dates = ["NO DATA"];
  let startDate;
  let endDate;
  let selected = "100";
  $: {
    if (dates.length) {
      $endDateIndex = dates.length - 1;
    }
  }
  $: startDate = dates[$startDateIndex].label;
  $: endDate = dates[$endDateIndex].label;

  function stop() {
    playing = false;
    clearInterval(intVal);
  }
</script>

<style>
  input {
    width: 100%;
  }

  .button,
  .date,
  select,
  input {
    box-sizing: border-box;
    vertical-align: middle;
    display: inline-block;
    margin: 0.5em 0
  }

  select{
    width: 7.5em;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 0fr 1fr 1fr 0fr;
    grid-template-rows: 1fr;
    grid-template-areas: "start startSlider endSlider end";
    gap: 1em;
    padding: 0 8px;
  }

  .start {
    padding: 0.3em;
    margin:0;
    font-size:2em
  }

  .startSlider {
    grid-area: startSlider;
    padding: 0.5em;
    height:2.5em;
  }

  .endSlider {
    grid-area: endSlider;
    padding: 0.5em;
    height:2.5em;
  }

  .end {
    grid-area: end;
    padding: 0.3em;
    margin:0;
    font-size:2em
  }
</style>


<section class="grid-container">
  <div class="start">{startDate}</div>
  <input
    class="startSlider"
    type="range"
    min="0"
    max={$endDateIndex-1}
    bind:value={$startDateIndex} />
  <input
    class="endSlider"
    type="range"
    min="{$startDateIndex+1}"
    max={dates.length - 1}
    bind:value={$endDateIndex} />
    <div class="end">{endDate}</div>
</section>
