<script>
  export let disabled;
  export let active;
</script>

<span class:disabled class:active>
  <slot />
</span>

<style>
  span {
    display: inline-block;
    color: black;
    background-color: rgb(239, 239, 239);
    height: 32px;
    min-width: 32px;
    padding: 4px;
    line-height: 24px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    margin-left: 4px;
    border-radius: 4px;
    box-sizing: border-box;
  }
  span.disabled {
    color: rgba(16, 16, 16, 0.3);
    background-color: rgba(239, 239, 239, 0.3);
    border-color: rgba(118, 118, 118, 0.3);
  }
  span.active {
    color: black;
    background-color: rgb(255, 125, 125);
  }
</style>
