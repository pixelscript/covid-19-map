<script>
  import { selectedDateIndex } from "./main.store";
  export let dates = ["NO DATA"];
  $: {
    if (dates.length) {
      $selectedDateIndex = dates.length - 1;
    }
  }
  $: date = dates[$selectedDateIndex];
  let intVal;
  const play = () => {
    clearInterval(intVal);
    selectedDateIndex.set(0);
    intVal = setInterval(() => {
      if ($selectedDateIndex + 1 < dates.length) {
        selectedDateIndex.set($selectedDateIndex + 1);
      } else {
        clearInterval(intVal);
      }
    }, 100);
  };
</script>

<style>
  input {
    width: 100%;
    vertical-align: middle;
  }
  p {
    text-align: center;
    margin-top: -2em;
    font-size: 2em;
    margin-bottom: 1em;
  }

  button,
  input {
    vertical-align: middle;
    display: inline-block;
    height: 2.5em;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 0fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "button slider";
    gap: 1em;
  }

  .button {
    grid-area: button;
    padding: 0.5em;
  }

  .slider {
    grid-area: slider;
    padding: 0.5em;
  }
</style>

<p>{date}</p>
<section class="grid-container">
  <button
    type="button"
    on:click={() => {
      play();
    }}
    class="button">
    PLAY
  </button>
  <input
    class="slider"
    type="range"
    min="0"
    max={dates.length - 1}
    bind:value={$selectedDateIndex} />
</section>
