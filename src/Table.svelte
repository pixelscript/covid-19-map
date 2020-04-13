<script>
  import {
    searchFilter,
    highlightCountryCode,
    selectedDateIndex,
    selectedCountryCode
  } from "./main.store";
  import { afterUpdate } from "svelte";
  export let body;
  let tBody;
  let over = false;
  afterUpdate(() => {
    const highlighted = tBody.querySelector(".highlighted");
    if (highlighted && !over && !$selectedCountryCode) {
      highlighted.scrollIntoView(false);
    }
  });

  const getClasses = code => {
    const classes = [];
    if (code === $highlightCountryCode) {
      classes.push("highlighted");
    }
    if (code === $selectedCountryCode) {
      classes.push("selected");
    }
    return classes.join(" ");
  };
</script>

<style>
  table {
    width: 100%;
    max-height: 100%;
    border-color: red;
    background: white;
  }

  .hider {
    background: white;
    position: absolute;
    height: 2px;
    width: 100%;
    z-index: 1;
    left: 0px;
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
  tbody tr {
    cursor: pointer;
  }
  table tr.selected td {
    border: 1px solid red;
    background: #ffc8c4;
  }

  table tr.highlighted {
    background-color: #abcee3;
  }
  table th,
  table td {
    padding: 0.5rem;
  }

  .limit {
    max-width: 170px;
    text-overflow: ellipsis;
  }
</style>

<div class="hider" />
<table on:mouseover={() => (over = true)} on:mouseleave={() => (over = false)}>
  <thead>
    <tr>
      <th>Country/Region</th>
      <th>Cases</th>
      <th>Deaths</th>
      <th>Recoveries</th>
    </tr>
  </thead>
  <tbody bind:this={tBody}>
    {#each body as row}
      {#if !$searchFilter || row.name
          .toLowerCase()
          .indexOf($searchFilter.toLowerCase()) !== -1}
        <tr
          class={getClasses(row.codeA2, $highlightCountryCode, $selectedCountryCode)}
          on:mouseover={() => {
            $highlightCountryCode = row.codeA2;
          }}
          on:click={() => {
            if ($selectedCountryCode === row.codeA2) {
              $selectedCountryCode = null;
            } else {
              $selectedCountryCode = row.codeA2;
            }
          }}>
          <td class="limit tooltip" title={row.name}>{row.name}</td>
          <td>
            {row.data[$selectedDateIndex]['cases'].value.toLocaleString()}
          </td>
          <td>
            {row.data[$selectedDateIndex]['deaths'].value.toLocaleString()}
          </td>
          <td>
            {row.data[$selectedDateIndex]['recoveries'].value.toLocaleString()}
          </td>

        </tr>
      {/if}
    {/each}
  </tbody>
</table>
