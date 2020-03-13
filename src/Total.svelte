<script>
  import { selectedDateIndex } from "./main.store";
  export let body;
  let total;
  $: total = calcTotal($selectedDateIndex);
  const calcTotal = () => {
    let total = 0;
    body.forEach(country => {
      total += country.data[$selectedDateIndex]['cases'].value;
    });
    return total.toLocaleString();
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
    color:#333;
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
</style>

<span class="total">
  <div class="title">Total</div>
  <div class="value">{total}</div>
</span>
