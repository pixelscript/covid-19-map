<script>
  import { selectedCountryCode, selectedDateIndex } from "./main.store";
  import { afterUpdate } from "svelte";
  export let body;
  let tBody;
  let over = false;
  afterUpdate(() => {
    const selected = tBody.querySelector(".selected");
    if (selected && !over) {
      selected.scrollIntoView(false);
    }
  });
</script>

<style>
  table {
    width: 100%;
    max-height: 100%;
    border-color: red;
    background:white;
  }

  .hider {
    background: white;
    position: absolute;
    height:2px;
    width:100%;
    z-index:1;
    left:0px;
  }
  thead {
    background: white;
  }
  th {
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
        position: sticky;
    top: 2px;
  }
  table tr th {
    background: #52657c;
    color: white;
    text-align: left;
  }
  table tr td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  table tr:nth-child(odd) {
    background-color: rgba(171, 206, 227, 0.3);
  }
  table tr:hover {
    background-color: #abcee3;
  }

  table tr.selected {
    background-color: #abcee3;
  }
  table th,
  table td {
    padding: 0.5rem;
  }
</style>
<div class="hider"></div>
<table on:mouseover={() => (over = true)} on:mouseleave={() => (over = false)}>
  <thead>
    <tr>
      <th>Country/Region</th>
      <th>Confirmed cases</th>
    </tr>
  </thead>
  <tbody bind:this={tBody}>
    {#each body as row}
      <tr
        class={row.code === $selectedCountryCode ? 'selected' : ''}
        on:mouseover={() => {
          selectedCountryCode.set(row.code);
        }}>
        <td>
          {row.country}
        </td>
        <td>{row.data[$selectedDateIndex].value.toLocaleString()}</td>
      </tr>
    {/each}
  </tbody>
</table>
