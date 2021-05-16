<script>
  export let value;
  export let label;
  export let active = false;
  export let disabled;
  export let id;
  export let setActiveId;
</script>

<div class="keyboard-input">
  <div class="button-container">
    <button class:active {disabled} on:click={() => setActiveId(id)}>
      {value}
    </button>
  </div>
  <div class="label-container">
    <span>{label}</span>
  </div>
</div>

<style>
  .keyboard-input {
    width: 100%;
    display: flex;
  }
  .label-container {
    flex-basis: 50%;
    text-align: left;
  }
  .button-container {
    flex-basis: 50%;
    text-align: right;
  }
  span {
    flex-grow: 1;
    line-height: 32px;
  }
  button {
    height: 32px;
    min-width: 32px;
    padding: 4px;
    line-height: 20px;
    font-size: 20px;
    cursor: pointer;
    margin-right: 4px;
  }
  button.active {
    color: black;
    background-color: rgba(255, 125, 125);
  }
</style>
