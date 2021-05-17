<script>
  export let disabled;
  export let active;
  export let setActiveId;
  export let id;
</script>

<button
  class:disabled
  class:active
  on:click={() => {
    if (!disabled) {
      setActiveId(id);
    }
  }}
>
  <slot />
</button>

<style>
  button {
    height: 32px;
    min-width: 32px;
    padding: 4px;
    line-height: 20px;
    font-size: 20px;
    cursor: pointer;
    margin-right: 4px;
  }
  button.disabled {
    color: rgba(16, 16, 16, 0.3);
    background-color: rgba(239, 239, 239, 0.3);
    border-color: rgba(118, 118, 118, 0.3);
  }
  button.active {
    color: black;
    background-color: rgb(255, 125, 125);
  }
</style>
