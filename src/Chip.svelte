<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let country = {};
</script>

<style>
  .chip {
    display: inline-block;
    background: #52657c;
    font-size: 1em;
    line-height: 1.5em;
    padding: 0.5em;
    border-radius: 1em;
    margin: 0.25em;
  }

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    background: #52657c;
    font-size: 1em;
    line-height: 1em;
    padding: 0;
    margin: 0;
    vertical-align: middle;
  }

  @media (max-width: 1200px) {
    .name {
      max-width:200px
    }
  }

  @media (max-width: 850px) {
    .name {
      max-width:100px
    }
  }

  @media (max-width: 500px) {
    .name {
      max-width:45px
    }
  }

  button {
    padding: 0;
    margin: 0;
    border-radius: 1em;
    background: transparent;
    color: white;
    border: 0;
    cursor: pointer;
    vertical-align: middle;
  }
</style>

<div class="chip">
  <span class="name">{country.name}</span>
  <button type="button" on:click={() => dispatch('removed')}>Ⓧ</button>
</div>
