<script>
  import { selectedDateIndex } from "./main.store";
  export let dates = ["NO DATA"];
  let playing = false;
  let selected = "100";
  $: {
    if (dates.length) {
      $selectedDateIndex = dates.length - 1;
    }
  }
  $: date = dates[$selectedDateIndex];
  let intVal;
  function play() {
    clearInterval(intVal);
    selectedDateIndex.set(0);
    playing = true;
    intVal = setInterval(() => {
      if ($selectedDateIndex + 1 < dates.length) {
        selectedDateIndex.set($selectedDateIndex + 1);
      } else {
        stop();
      }
    }, Number(selected));
  }

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
    grid-template-columns: 0fr 0fr 1fr 0fr;
    grid-template-rows: 1fr;
    grid-template-areas: "button speed slider date";
    gap: 1em;
    padding: 0 8px;
  }

  .button {
    grid-area: button;
    padding: 0.5em;
  }

  .speed {
    grid-area: speed;
    padding: 0.5em;
  }

  .slider {
    grid-area: slider;
    padding: 0.5em;
    height:2.5em;
  }

  .date {
    grid-area: date;
    padding: 0.3em;
    margin:0;
    font-size:2em
  }
</style>


<section class="grid-container">
  <button
    type="button"
    on:click={() => {
      !playing ? play() : stop();
    }}
    class="button">
    {!playing ? 'PLAY' : 'STOP'}
  </button>
  <select class="speed" bind:value={selected}>
    <option value="1000">1 days/s</option>
    <option value="200">5 days/s</option>
    <option value="100">10 days/s</option>
    <option value="50">20 days/s</option>
    <option value="25">40 days/s</option>
    <option value="13">80 days/s</option>
  </select>
  <input
    class="slider"
    type="range"
    min="0"
    max={dates.length - 1}
    bind:value={$selectedDateIndex} />
    <div class="date">{date}</div>
</section>
